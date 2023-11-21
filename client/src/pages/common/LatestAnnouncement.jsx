import React, { useState, useEffect } from "react";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import TagLine from "../../components/TagLines/TagLine";
import { UseSelector, useSelector } from "react-redux";
import axios from "axios";
import {
  createMessage,
  getMessage,
  editMessage,
  deleteMessage,
} from "../../services/Messages";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdEdit, MdDelete } from "react-icons/md";
const LatestAnnouncement = () => {
  const userstate = useSelector((state) => state.user);
  const [message, setmessage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showdata, setShowdata] = useState([]);
  const [buttonsend, setbuttonsend] = useState("send");
  const [mid,setmid]=useState(null);
  const { data: messageData, isLoading: messageIsLoading } = useQuery({
    queryFn: () => {
      return getMessage();
    },
    queryKey: ["latestmessages"],
  });

  const { mutate, isLoading: createmessageIsLoading } = useMutation({
    mutationFn: ({ message, role, id }) => {
      return createMessage({
        message,
        role,
        id,
      });
    },
    onSuccess: (data) => {
      setmid(null);
      setShowdata("");
      setbuttonsend("Send");
      queryClient.invalidateQueries(["latestmessages"]);
      console.log("data ", data && data?.data);
      toast.success("Message Created");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const handleInput = (e) => {
    setmessage(e.target.value);
  };

  const apply_edit_message = async () => {
    const datas = { message_id: mid, message: message };
    // console.log(datas);
    const data = await axios.patch(
      "/api/message/edit_message",
      {
        datas,
      },
      {
        withCredentials: true,
      }
    );
    if (data?.data) {
      toast.success("Message edited");
      setmessage("");
      setmid(null);
      setbuttonsend("send");
      queryClient.invalidateQueries(["latestmessages"]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(buttonsend + "hello");
    if (buttonsend === "Edit") {
      // console.log(buttonsend + " Edit");
      apply_edit_message();
      queryClient.invalidateQueries(["latestmessages"]);
      return;
    }
    if (!message) {
      toast.error("Enter message");
    }
    mutate({
      message: message,
      role: userstate?.userInfo?.role,
      id: userstate?.userInfo?._id,
    });
  };

  const editMessage = async (message_id, message) => {
    setbuttonsend("Edit");
    // console.log(message_id, message);
    setmessage(message);
    setmid(message_id);
  };

  const deleteMessage = async (message_id) => {
    // console.log("deleted");
    // console.log(message_id, typeof message_id);
    // const datas = { message_id: message_id };
    const data = await axios.delete(
      `/api/message/remove_message/${message_id}`,
      {
        withCredentials: true,
      }
    );
    // console.log(data);
    queryClient.invalidateQueries(["latestmessages"]);
  };
  useEffect(() => {
    if (
      userstate &&
      userstate?.userInfo &&
      userstate?.userInfo?.role &&
      userstate?.userInfo.role !== "Officer"
    ) {
      const data =
        userstate &&
        messageData &&
        messageData.filter((val) => {
          return (
            (val.warden !== null &&
              val.warden.hostelAssign ===
                userstate?.userInfo?.hostelAssign._id) ||
            val.officer !== null
          );
        });
      data && setShowdata(data);
      // console.log("warden message data",data);
    } else {
      // console.log("officer message data",messageData);
      messageData && setShowdata(messageData);
    }
    return () => {
      showdata && console.log("datas : ", showdata);
    };
  }, [messageData]);

  useEffect(() => {
    if (!userstate.userInfo) {
      navigate("/");
    }
  }, [navigate, userstate.userInfo]);

  return (
    <>
      <section className="h-full mb-5">
        <TopNavBar />
        <TagLine heading={"Announcements"} />

        {userstate &&
          userstate?.userInfo &&
          userstate?.userInfo?.role &&
          userstate?.userInfo?.role !== "Officer" && (
            <div
              className={`border-4 mt-5 mx-auto flex flex-col overflow-scroll gap-y-4 ${
                userstate &&
                userstate?.userInfo &&
                userstate?.userInfo?.role &&
                userstate?.userInfo?.role !== "Officer" &&
                userstate?.userInfo?.role !== "warden"
                  ? "h-full"
                  : "h-96"
              }`}
            >
              {showdata &&
                showdata.map((val) => {
                  return (
                    <div>
                      {val.warden !== null ? (
                        <div className="border flex justify-between border-orange-500 text-center bg-sky-400 text-white">
                          <div className="flex flex-col">
                            <h2>{val.warden.name}</h2>
                            <h2>{val.warden.phoneNo}</h2>
                          </div>

                          <div className="flex flex-col">
                            <h2 className="font-bold text-black p-2">
                              {val.message}
                            </h2>
                            <h2 className="font-bold text-dark-soft p-2">
                              {val.createdAt.substring(0, 10)}
                            </h2>
                            {val?.updatedAt !== val?.createdAt && (
                              <h2 className="font-bold text-dark-soft p-2">
                                Edited
                              </h2>
                            )}
                          </div>

                          {val.warden._id === userstate?.userInfo?._id && (
                            <div className="flex flex-col">
                              <h2 className="cursor-pointer text-2xl p-2 text-orange-500">
                                <MdEdit
                                  onClick={() =>
                                    editMessage(val._id, val.message)
                                  }
                                />
                              </h2>
                              <h2 className="cursor-pointer text-2xl p-2 text-red-700">
                                <MdDelete
                                  onClick={() => deleteMessage(val._id)}
                                />
                              </h2>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="border flex justify-between border-b-red-950 text-center bg-green-400 text-white">
                          <div className="flex flex-col">
                            <h2>{val.officer.name}</h2>
                            <h2>{val.officer.phoneNo}</h2>
                          </div>

                          <div className="flex flex-col">
                            <h2 className="font-bold text-black p-2">
                              {val.message}
                            </h2>
                            <h2 className="font-bold text-dark-soft p-2">
                              {val.createdAt.substring(0, 10)}
                            </h2>
                            {val?.updatedAt !== val?.createdAt && (
                              <h2 className="font-bold text-dark-soft p-2">
                                Edited
                              </h2>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              {!showdata && (
                <div className="border border-b-red-950 text-center bg-green-400 text-white">
                  <h2>NO CHAT FOUND</h2>
                </div>
              )}
            </div>
          )}

        {userstate &&
          userstate?.userInfo &&
          userstate?.userInfo?.role &&
          userstate?.userInfo?.role === "Officer" && (
            <div className="border-4 mt-5 mx-auto flex flex-col gap-y-4 h-96 overflow-scroll">
              {showdata &&
                showdata.map((val) => {
                  return (
                    <div>
                      {val.warden !== null ? (
                        <div className="border flex justify-between border-orange-500 text-center bg-sky-400 text-white">
                          <div className="flex flex-col">
                            <h2>{val.warden.name}</h2>
                            <h2>{val.warden.phoneNo}</h2>
                          </div>

                          <div className="flex flex-col">
                            <h2 className="font-bold text-black p-2">
                              {val.message}
                            </h2>
                            <h2 className="font-bold text-dark-soft p-2">
                              {val.createdAt.substring(0, 10)}
                            </h2>
                            {val?.updatedAt !== val?.createdAt && (
                              <h2 className="font-bold text-dark-soft p-2">
                                Edited
                              </h2>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="border flex justify-between border-b-red-950 text-center bg-green-400 text-white">
                          <div className="flex flex-col">
                            <h2>{val.officer.name}</h2>
                            <h2>{val.officer.phoneNo}</h2>
                          </div>

                          <div className="flex flex-col">
                            <h2 className="font-bold text-black p-2">
                              {val.message}
                            </h2>
                            <h2 className="font-bold text-dark-soft p-2">
                              {val.createdAt.substring(0, 10)}
                            </h2>
                            {val?.updatedAt !== val?.createdAt && (
                              <h2 className="font-bold text-dark-soft p-2">
                                Edited
                              </h2>
                            )}
                          </div>

                          {val.officer._id === userstate?.userInfo?._id && (
                            <div className="flex flex-col">
                              <h2 className="cursor-pointer text-2xl p-2 text-orange-500">
                                <MdEdit
                                  onClick={() =>
                                    editMessage(val._id, val.message)
                                  }
                                />
                              </h2>
                              <h2 className="cursor-pointer text-2xl p-2 text-red-700">
                                <MdDelete
                                  onClick={() => deleteMessage(val._id)}
                                />
                              </h2>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              {!showdata && (
                <div className="border border-b-red-950 text-center bg-green-400 text-white">
                  <h2>NO CHAT FOUND</h2>
                </div>
              )}
            </div>
          )}

        {userstate &&
          userstate?.userInfo &&
          userstate?.userInfo?.role &&
          (userstate?.userInfo?.role === "warden" ||
            userstate?.userInfo?.role === "Officer") && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-3/4 border border-black">
                  <input
                    type="text"
                    name="message"
                    id="message"
                    value={message}
                    onChange={handleInput}
                    placeholder="Type a message"
                    className="w-full p-2 border border-black text-center font-bold text-2xl"
                  />
                </div>
                <div className="w-full md:w-1/4 border border-blue-700 text-center font-bold text-white bg-fuchsia-950">
                  <input
                    type="submit"
                    value={buttonsend}
                    className="text-center cursor-pointer p-2 border border-orange-900 rounded-xl bg-sky-400"
                  />
                </div>
              </div>
            </form>
          )}
      </section>
    </>
  );
};

export default LatestAnnouncement;
