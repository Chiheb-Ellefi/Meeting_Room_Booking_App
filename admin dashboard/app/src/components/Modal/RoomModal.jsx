import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import ImageSlider from "../Images/ImageSlider";
import { Plus, X } from "lucide-react";
import uploadImages from "../../services/UploadImages";
import { useDispatch } from "react-redux";
import { addRoom, fetchRooms } from "../../redux/features/RoomsSlice";
import LoadingModal from "./LoadingModal";
const RoomModal = ({ open, onClose }) => {
  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Lac");
  const [site, setSite] = useState("Zhenite 1");
  const [inputs, setInputs] = useState([]);
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };
  useEffect(() => {
    if (images.length < 1) return;
    const newImagesUrl = [];
    images.map((image) => newImagesUrl.push(URL.createObjectURL(image)));
    setImageURLs(newImagesUrl);
  }, [images]);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleAddInputFields = (e) => {
    e.preventDefault();
    setInputs([...inputs, { key: "", value: "" }]);
  };
  const handleDelete = (index) => {
    const deleteVal = [...inputs];
    deleteVal.splice(index, 1);
    setInputs(deleteVal);
  };
  const handleChange = (e, index) => {
    const newInputs = [...inputs];
    const { name, value } = e.target;
    newInputs[index][name] = value;
    setInputs(newInputs);
  };
  const handleAddRoom = async () => {
    if (name == "") {
      setNameError("Room Name is required!");
      return;
    }
    setLoading(true);
    const newInputs = inputs.reduce(
      (acc, { key, value }) => ({ ...acc, [key]: value }),
      {}
    );
    uploadImages({
      imageURLs,
      roomName: name,
    }).then((downloadURLs) => {
      const data = {
        details: {
          booked: false,
          details: {
            name,
            images: downloadURLs,
            site,
            location,
            ...newInputs,
          },
        },
      };
      dispatch(addRoom(data)).then((result) => {
        if (result.payload) {
          setLoading(false);
          onClose();
          setImages([]);
          setImageURLs([]);
          setName("");
          setNameError("");
          setLocation("Lac");
          setSite("Zhenite 1");
          setInputs([]);
          dispatch(
            fetchRooms({ offset: 0, limit: 10, filter: "", search: "" })
          );
        }
      });
    });
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col gap-7 w-[700px] h-[400px] ">
          <h1 className="font-bold text-3xl text-center text-black/80">
            Add Room
          </h1>
          <div className="flex items-start mb-2  w-full h-[300px] justify-around overflow-hidden  ">
            <div className="flex flex-col gap-6 items-center ">
              <div className=" w-64 h-44">
                <ImageSlider images={imageURLs} showIndicator={true} />
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onImageChange}
                ref={hiddenFileInput}
                className="hidden"
              />
              <button
                onClick={handleClick}
                className=" bg-red-500 px-4 rounded shadow py-1 text-white mt-5 "
              >
                Upload Images
              </button>
            </div>
            <div className=" flex w-60  h-full ">
              <form className="flex flex-col gap-2 w-full overflow-y-scroll no-scrollbar ">
                <div className="flex flex-col w-full justify-start ">
                  <label
                    className=" text-black/70  font-medium mb-1"
                    htmlFor="name"
                  >
                    Room Name
                  </label>
                  <p className="text-red-500 text-sm">{nameError}</p>
                  <input
                    required
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="rounded w-full bg-white  text-md pl-2 outline-none border-2 border-black/20"
                  />
                </div>
                <div className="flex flex-col w-full justify-start">
                  <label
                    className=" text-black/70  font-medium mb-1 "
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <select
                    name="location"
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(() => {
                        setSite(
                          e.target.value == "Lac" ? "Zhenite 1" : "Charguia 1"
                        );
                        return e.target.value;
                      });
                    }}
                    className="rounded w-full bg-white   p-1 outline-none border-2 border-black/20"
                  >
                    <option className="text-md" value="Lac">
                      Lac
                    </option>
                    <option className="text-md" value="Charguia">
                      Charguia
                    </option>
                  </select>
                </div>
                <div className="flex flex-col w-full justify-start">
                  <label
                    className=" text-black/70  font-medium mb-1 "
                    htmlFor="site"
                  >
                    Site
                  </label>
                  <select
                    name="site"
                    id="site"
                    type="text"
                    value={site}
                    onChange={(e) => {
                      setSite(e.target.value);
                    }}
                    className="rounded w-full bg-white  text-md p-1 outline-none border-2 border-black/20"
                  >
                    <option
                      disabled={location == "Charguia"}
                      className={`${location == "Charguia" && "hidden"}`}
                      value="Zhenite 1"
                    >
                      Zhenite 1
                    </option>
                    <option
                      disabled={location == "Charguia"}
                      className={`${location == "Charguia" && "hidden"}`}
                      value="Zhenite 2"
                    >
                      Zhenite 2
                    </option>
                    <option
                      disabled={location == "Lac"}
                      className={`${location == "Lac" && "hidden"}`}
                      value="Charguia 1"
                    >
                      Charguia 1
                    </option>
                    <option
                      disabled={location == "Lac"}
                      className={`${location == "Lac" && "hidden"}`}
                      value="Charguia 2"
                    >
                      Charguia 2
                    </option>
                  </select>
                </div>
                <div>
                  {inputs.map((input, index) => {
                    return (
                      <div key={index} className="flex gap-2 mt-5">
                        <input
                          name="key"
                          type="text"
                          placeholder="Key"
                          value={input.key}
                          className="rounded w-full bg-white  text-md pl-2 outline-none border-2 border-black/20"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                        />
                        <input
                          name="value"
                          type="text"
                          placeholder="Value"
                          value={input.value}
                          className="rounded w-full bg-white  text-md pl-2 outline-none border-2 border-black/20"
                          onChange={(e) => {
                            e.preventDefault();
                            handleChange(e, index);
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(index);
                          }}
                        >
                          <X size={20} className="text-gray-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex justify-end ">
                  <button
                    onClick={handleAddInputFields}
                    className="p-1 shadow-md rounded w-auto  "
                  >
                    <Plus />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full flex justify-end gap-6">
            <button
              onClick={() => {
                onClose();
                setNameError("");
              }}
              className="btn btn-light"
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={async (e) => {
                e.preventDefault();
                handleAddRoom();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      {loading && <LoadingModal loading={loading} />}
    </>
  );
};

export default RoomModal;
