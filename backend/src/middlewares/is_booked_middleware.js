const { sequelize } = require("../../config/database/database");
const { QueryTypes } = require("sequelize");
const { BadRequest } = require("../../config/errors");

const isBookedMiddleware = async (req, res, next) => {
  const reservation = await sequelize.query(
    `SELECT res_id 
     FROM public.reservations 
     WHERE room_id=:room_id AND valid = true 
     AND (
         ((checkin->>'time')::time <= :out AND (checkout->>'time')::time >= :in)
         OR
         ((checkout->>'time')::time >= :in AND (checkin->>'time')::time <= :out)
     );`,
    {
      type: QueryTypes.SELECT,
      replacements: {
        room_id: req.body.room_id,
        out: req.body.checkout.time,
        in: req.body.checkin.time,
      },
    }
  );

  if (reservation.length > 0) {
    throw new BadRequest("Room is booked for that date");
  }

  next();
};

module.exports = isBookedMiddleware;
