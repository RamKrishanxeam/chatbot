import React, { useState, useEffect } from "react";
import dummyData from "../../Resources/dummyData.json"; // Adjust the path
import { useNavigate } from "react-router-dom";
import dummyData2 from "../../Resources/countertopData.json";
import marblethumbnail from "../../Resources/marbleThumbnail.jpg";
import granitethumbnail from "../../Resources/graniteThumbnail.jpg";
import dummyData3 from "../../Resources/segment.json";
import ChatBotModal from "../../Components/ChatBotModal/ChatBotModal";
import homepageLogo from "../../assets/home_bottom_icons.png";
import arrowDown from "../../assets/images/Button.png";
import botIcon from "../../assets/images/Frame-7.png";
import userIcon from "../../assets/images/user.png";
import rightArrow from "../../assets/images/rightArrow.png";

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threadID, setThreadID] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [firstReco, setFirstReco] = useState(true);
  const [uploadRoomButtonCount, setUploadRoomButtonCount] = useState(0);
  const [isCountertop, setIsisCountertop] = useState(false);
  const [countertopData, setcountertopData] = useState([]);
  const [segmentData, setSegmentData] = useState([]);

  const endpoint = "http://127.0.0.1:5000";
  // const endpoint = "https://ai-chatbot-sky6.onrender.com";

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    setJsonData(dummyData); // Load dummyData when the component mounts
    setcountertopData(dummyData2);
    setSegmentData(dummyData3);
    const defaultMessage = {
      sender: "bot",
      messageTitle: "Hi there!",
      messageBody: "I'm MSI Chatbot. Your guide for surfaces.",
      imgSource: botIcon,
      customStyles: "",
      customClass: "",
    };
    const defaultMessage2 = {
      sender: "bot",
      messageTitle: "",
      messageBody: "Please choose an option to begin:",
      imgSource: "",
      customStyles: "mt-2",
      customClass: "",
      type: "firstMessage",
    };
    setMessages((prevMessages) => [
      ...prevMessages,
      defaultMessage,
      defaultMessage2,
    ]);
  }, []);

  const incrementUploadCount = () => {
    setUploadRoomButtonCount((prevCount) => prevCount + 1); // Increment the count by 1
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true); // State to toggle between the images

  // Open and close modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleModal = () => setModalOpen((prevState) => !prevState);

  const toggleImage = () => {
    setIsLogoVisible((prevState) => !prevState); // Toggle between logo and arrow
  };

  const handleSendMessage = async (text, id = null) => {
    const userMessage = {
      sender: "user",
      messageTitle: "",
      messageBody: text,
      imgSource: userIcon,
      customStyles: "mt-20",
      customClass: "",
      customBg: "bg-[#E8EDF2]",
      type: "text",
      Synthetic: "",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (text.toLowerCase() === "countertop") {
      setIsisCountertop(true);
      await processCountertopMessage(text);
      return;
    } else if (isCountertop) {
      await processCountertopMessage(text);
      return;
    } else {
      setIsisCountertop(false);
      await processOtherMessage(text);
    }
  };

  const handleSelectedTile = async (tileUrl) => {
    if (isCountertop) {
      console.log(tileUrl);
      setLoading(true);
      const matchingTile = countertopData.find(
        (tile) => tile.main_image_url === tileUrl
      );
      console.log(matchingTile);
      const thumbnailUrl = matchingTile.thumbnail_url
        ? matchingTile.thumbnail_url
        : matchingTile.main_image_url;
      console.log(thumbnailUrl);
      const userMessage = {
        sender: "user",
        text: thumbnailUrl,
        type: "tile",
        imgSource: userIcon,
        title: matchingTile.product_name,
        pre: matchingTile.category,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (matchingTile) {
        const {
          main_image_url,
          thumbnail_url,
          modal_url,
          ...filteredTile
        } = matchingTile; // Destructure and exclude unwanted keys

        const name = matchingTile.product_name;

        const jsonString = JSON.stringify(filteredTile); // Stringify the filtered object

        const payloadMessage = `User is interested in the countertop ${name}: ${jsonString}`;
        const payload = new FormData();
        payload.append("user_input", payloadMessage);
        payload.append("thread_id", threadID);

        if (firstReco) {
          payload.append("first_reco", firstReco);
        } else {
          payload.append("first_reco", false);
        }

        try {
          const response = await fetch(
            `${endpoint}/send_countertop_message_chat`,
            {
              method: "POST",
              body: payload,
            }
          );

          if (!response.ok) throw new Error("Network response was not ok");

          const data = await response.json();
          setThreadID(data.thread_id);

          const botResponse = getBotResponse(data.assistant_response);
          setMessages((prevMessages) => [...prevMessages, botResponse]);

          if (
            data.assistant_response.response_type.toLowerCase() === "tiles" &&
            data.assistant_response.response.query_so_far &&
            data.assistant_response.response.query_so_far.length > 0
          ) {
            const userQueryResponse = {
              sender: "bot",
              text: data.assistant_response.response.query_so_far,
              type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, userQueryResponse]);
          }

          if (
            uploadRoomButtonCount < 2 &&
            data.assistant_response.user_want_to_upload
          ) {
            incrementUploadCount();
            const uploadResponse = { sender: "bot", type: "upload" };
            setMessages((prevMessages) => [...prevMessages, uploadResponse]);
          }
          if (
            data.assistant_response.follow_up &&
            data.assistant_response.follow_up.length > 0
          ) {
            const followUpResponse = {
              sender: "bot",
              text: data.assistant_response.follow_up,
              type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, followUpResponse]);
          }
        } catch (error) {
          // console.error("Error:", error);
          const errorMessage = {
            sender: "bot",
            text: "Sorry, something went wrong. Please try again.",
            type: "text",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setLoading(true);
      const matchingTile = jsonData.find(
        (tile) => tile.main_image_url === tileUrl
      );

      const userMessage = {
        sender: "user",
        text: tileUrl,
        type: "tile",
        imgSource: userIcon,
        title: matchingTile.product_name,
        pre: matchingTile.category,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (matchingTile) {
        const { main_image_url, ...filteredTile } = matchingTile; // Destructure and exclude unwanted keys

        const name = matchingTile.product_name;

        const jsonString = JSON.stringify(filteredTile); // Stringify the filtered object

        const payloadMessage = `User is interested in the flooring ${name}: ${jsonString}`;
        const payload = new FormData();
        payload.append("user_input", payloadMessage);
        payload.append("thread_id", threadID);

        if (firstReco) {
          payload.append("first_reco", firstReco);
        } else {
          payload.append("first_reco", false);
        }

        try {
          const response = await fetch(`${endpoint}/send_message_chat`, {
            method: "POST",
            body: payload,
          });

          if (!response.ok) throw new Error("Network response was not ok");

          const data = await response.json();
          setThreadID(data.thread_id);

          const botResponse = getBotResponse(data.assistant_response);
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          if (
            data.assistant_response.response_type.toLowerCase() === "tiles" &&
            data.assistant_response.response.query_so_far &&
            data.assistant_response.response.query_so_far.length > 0
          ) {
            const userQueryResponse = {
              sender: "bot",
              messageBody: data.assistant_response.response.query_so_far,
              type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, userQueryResponse]);
          }

          if (data.assistant_response.visualize_it) {
            const matchingTile = jsonData.find(
              (tile) =>
                tile.product_name.toLowerCase() ===
                data.assistant_response.visualize_it.toLowerCase()
            );
            const visualId = matchingTile.visual_id;
            const visualMessage = {
              sender: "bot",
              messageBody: matchingTile.product_name,
              visualId: visualId,
              type: "visualize",
            };
            setMessages((prevMessages) => [...prevMessages, visualMessage]);
          }
          if (
            uploadRoomButtonCount < 2 &&
            data.assistant_response.user_want_to_upload
          ) {
            incrementUploadCount();
            const uploadResponse = { sender: "bot", type: "upload" };
            setMessages((prevMessages) => [...prevMessages, uploadResponse]);
          }
          if (
            data.assistant_response.follow_up &&
            data.assistant_response.follow_up.length > 0
          ) {
            const followUpResponse = {
              sender: "bot",
              messageBody: data.assistant_response.follow_up,
              type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, followUpResponse]);
          }
        } catch (error) {
          // console.error("Error:", error);
          const errorMessage = {
            sender: "bot",
            messageBody: "Sorry, something went wrong. Please try again.",
            type: "text",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleUpload = async (file) => {
    if (file) {
      // Check file size (less than 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMessage = {
          sender: "bot",
          text: "Sorry, File size should be less than 5 MB.",
          type: "text",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        return;
      }
    }

    setLoading(true);
    const imageUrl = URL.createObjectURL(file);
    const userMessage = {
      sender: "user",
      text: file.name,
      type: "image",
      imageUrl: imageUrl,
      imgSource: userIcon,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const image_metadata_payload = new FormData();
    image_metadata_payload.append("user_input", file.name);
    image_metadata_payload.append("image", file);
    image_metadata_payload.append("email", userEmail);
    setLoadingIndex(messages.length);

    const existingData = segmentData.find(
      (item) => item.filename === file.name
    );
    let data;
    try {
      if (existingData) {
        console.log("if case");
        const response = await fetch(`${endpoint}/segmented_image`, {
          method: "POST",
          body: image_metadata_payload,
        });

        if (!response.ok) throw new Error("Network response was not ok");
        setUploadRoomButtonCount(3);
        data = await response.json();
        console.log("found data");
      } else {
        const response = await fetch(`${endpoint}/segment_image`, {
          method: "POST",
          body: image_metadata_payload,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        setUploadRoomButtonCount(3);

        data = await response.json();
      }
      console.log(data);
      console.log("I am here");
      // if (data.imageUrl) {
      //   const segmentedUrl = data.imageUrl; // Check the base64 string logged in the console
      //   const newSegmentMessage = {
      //     type: "segment",
      //     segmentedUrl: segmentedUrl,
      //     originalUrl: imageUrl,
      //     sender: "user",
      //   };
      //   setMessages((prevMessages) => {
      //     // Remove the last message and add the new one
      //     const updatedMessages = [
      //       ...prevMessages.slice(0, -1),
      //       newSegmentMessage,
      //     ];
      //     return updatedMessages;
      //   });
      // }

      // if (data.metadata) {
      //   const splittedMetadata = data.metadata
      //     .split(".")
      //     .map((sentence, index) => {
      //       return sentence.trim() ? (
      //         <p key={index}>{sentence.trim()}.</p>
      //       ) : null;
      //     });

      //   const imageDataResponse = {
      //     sender: "bot",
      //     type: "text",
      //     messageTitle: "",
      //     messageBody: splittedMetadata,
      //     imgSource: "",
      //     customStyles: "",
      //     customClass: "",
      //   };
      //   setMessages((prevMessages) => [...prevMessages, imageDataResponse]);
      //   const payload = new FormData();
      //   payload.append(
      //     "user_input",
      //     `Suggest me some good products for my room explained in image metdata as following:, ${data.metadata}`
      //   );
      //   payload.append("thread_id", threadID);
      //   if (firstReco) {
      //     payload.append("first_reco", firstReco);
      //     setFirstReco(false);
      //   } else {
      //     payload.append("first_reco", false);
      //   }
      //   if (isCountertop) {
      //     try {
      //       const response = await fetch(
      //         `${endpoint}/send_countertop_message_chat`,
      //         {
      //           method: "POST",
      //           body: payload,
      //         }
      //       );

      //       if (!response.ok) throw new Error("Network response was not ok");

      //       const data = await response.json();
      //       console.log(data);
      //       setThreadID(data.thread_id);

      //       if (
      //         data.assistant_response.response_type.toLowerCase() === "tiles" &&
      //         data.assistant_response.response.query_so_far &&
      //         data.assistant_response.response.query_so_far.length > 0
      //       ) {
      //         const userQueryResponse = {
      //           sender: "bot",
      //           messageBody: data.assistant_response.response.query_so_far,
      //           type: "text",
      //         };
      //         setMessages((prevMessages) => [
      //           ...prevMessages,
      //           userQueryResponse,
      //         ]);
      //       }

      //       const botResponse = getBotResponse(data.assistant_response);
      //       setMessages((prevMessages) => [...prevMessages, botResponse]);

      //       if (
      //         data.assistant_response.follow_up &&
      //         data.assistant_response.follow_up.length > 0
      //       ) {
      //         const followUpResponse = {
      //           sender: "bot",
      //           messageBody: data.assistant_response.follow_up,
      //           type: "text",
      //         };
      //         setMessages((prevMessages) => [
      //           ...prevMessages,
      //           followUpResponse,
      //         ]);
      //       }
      //     } catch (error) {
      //       // console.error("Error:", error);
      //       const errorMessage = {
      //         sender: "bot",
      //         messageBody: "Sorry, something went wrong. Please try again.",
      //         type: "text",
      //       };
      //       setMessages((prevMessages) => [...prevMessages, errorMessage]);
      //     }
      //   } else {
      //     try {
      //       const response = await fetch(`${endpoint}/send_message_chat`, {
      //         method: "POST",
      //         body: payload,
      //       });

      //       if (!response.ok) throw new Error("Network response was not ok");

      //       const data = await response.json();
      //       console.log(data);
      //       setThreadID(data.thread_id);

      //       if (
      //         data.assistant_response.response_type.toLowerCase() === "tiles" &&
      //         data.assistant_response.response.query_so_far &&
      //         data.assistant_response.response.query_so_far.length > 0
      //       ) {
      //         const userQueryResponse = {
      //           sender: "bot",
      //           messageBody: data.assistant_response.response.query_so_far,
      //           type: "text",
      //         };
      //         setMessages((prevMessages) => [
      //           ...prevMessages,
      //           userQueryResponse,
      //         ]);
      //       }

      //       const botResponse = getBotResponse(data.assistant_response);
      //       setMessages((prevMessages) => [...prevMessages, botResponse]);

      //       if (data.assistant_response.visualize_it) {
      //         const matchingTile = jsonData.find(
      //           (tile) =>
      //             tile.product_name.toLowerCase() ===
      //             data.assistant_response.visualize_it.toLowerCase()
      //         );
      //         const visualId = matchingTile.visual_id;
      //         const visualMessage = {
      //           sender: "bot",
      //           messageBody: matchingTile.product_name,
      //           visualId: visualId,
      //           type: "visualize",
      //         };
      //         setMessages((prevMessages) => [...prevMessages, visualMessage]);
      //       }
      //       if (
      //         data.assistant_response.follow_up &&
      //         data.assistant_response.follow_up.length > 0
      //       ) {
      //         const followUpResponse = {
      //           sender: "bot",
      //           messageBody: data.assistant_response.follow_up,
      //           type: "text",
      //         };
      //         setMessages((prevMessages) => [
      //           ...prevMessages,
      //           followUpResponse,
      //         ]);
      //       }
      //     } catch (error) {
      //       // console.error("Error:", error);
      //       const errorMessage = {
      //         sender: "bot",
      //         messageBody: "Sorry, something went wrong. Please try again.",
      //         type: "text",
      //       };
      //       setMessages((prevMessages) => [...prevMessages, errorMessage]);
      //     }
      //   }
      // }
    } catch (error) {
      // console.error("Error:", error);
      const errorMessage = {
        sender: "bot",
        messageBody: "Sorry, something went wrong. Please try again.",
        type: "text",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
      setLoadingIndex(null);
    }
  };

  const getBotResponse = (data) => {
    const response_type = data.response_type;
    const response = data.response;
    const storesOptions = data.store;

    if (response_type.toLowerCase() === "tiles") {
      setFirstReco(false);
      return {
        sender: "bot",
        type: "tiles",
        tiles: response.tiles,
        headertext: response.header_text,
        footertext: response.footer_text,
        messageBody: "Here are best products that suits.",
        customStyles: "mb-5",
        imgSource: botIcon,
      };
    } else if (response_type.toLowerCase() === "options") {
      // Create a variable to store URLs found in options
      let images = [];
      let currentOptions = [];
      // Loop through the options array and check for the URL pattern
      response.options.forEach((option) => {
        // Check if the option contains the specific URL pattern
        if (option.includes("https://cdn.msisurfaces.com/")) {
          if (option.includes("arabescus-white-marble.jpg")) {
            currentOptions.push("Marble");
            images.push(marblethumbnail);
          } else if (option.includes("gray-atlantico-granite.jpg")) {
            currentOptions.push("Granite");
            images.push(granitethumbnail);
          }
        }
      });

      // If images are found in options, return with image options
      if (images.length > 0) {
        return {
          sender: "bot",
          type: "countertopdesign", // Type for image-based response
          options: currentOptions, // Your options
          messageBody: response.text,
          images: images, // Add found image URLs to the response
          imgSource: botIcon,
          specialTag: "chooseDesign",
        };
      } else {
        // If no image URLs are found, return a standard options response
        return {
          sender: "bot",
          type: "options",
          options: response.options,
          messageBody: response.text,
          imgSource: botIcon,
          customStyles: "mt-3",
          optionsImageSource: rightArrow,
        };
      }
    } else if (response_type.toLowerCase() === "collapsible") {
      return {
        sender: "bot",
        type: "collapsible",
        options: response.options,
        messageBody: response.text,
        imgSource: botIcon,
      };
    } else if (response_type.toLowerCase() === "email") {
      return {
        sender: "bot",
        messageBody: response.confirmation_message,
        type: "text",
        imgSource: botIcon,
      };
    } else if (response_type.toLowerCase() === "store") {
      return {
        sender: "bot",
        type: "store",
        options: storesOptions,
        messageBody: "The closest stores for you are:",
        imgSource: botIcon,
      };
    }
    return {
      sender: "bot",
      messageBody: response,
      type: "text",
      imgSource: botIcon,
    };
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const processCountertopMessage = async (text) => {
    setLoading(true);
    const payload = new FormData();
    payload.append("user_input", text);
    payload.append("thread_id", threadID);
    if (firstReco) {
      payload.append("first_reco", firstReco);
    } else {
      payload.append("first_reco", false);
    }

    try {
      const response = await fetch(`${endpoint}/send_countertop_message_chat`, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log(data);
      setThreadID(data.thread_id);
      const botResponse = getBotResponse(data.assistant_response);
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      if (
        data.assistant_response.response_type.toLowerCase() === "tiles" &&
        data.assistant_response.response.query_so_far &&
        data.assistant_response.response.query_so_far.length > 0
      ) {
        const userQueryResponse = {
          sender: "bot",
          messageBody: data.assistant_response.response.query_so_far,
          type: "text",
        };
        setMessages((prevMessages) => [...prevMessages, userQueryResponse]);
      }

      if (
        uploadRoomButtonCount < 2 &&
        data.assistant_response.user_want_to_upload
      ) {
        incrementUploadCount();
        setUploadRoomButtonCount();
        const uploadResponse = { sender: "bot", type: "upload" };
        setMessages((prevMessages) => [...prevMessages, uploadResponse]);
      }
      if (
        data.assistant_response.follow_up &&
        data.assistant_response.follow_up.length > 0
      ) {
        const followUpResponse = {
          sender: "bot",
          messageBody: data.assistant_response.follow_up,
          type: "text",
        };
        setMessages((prevMessages) => [...prevMessages, followUpResponse]);
      }
    } catch (error) {
      // console.error("Error:", error);

      // In case of an error, show a bot message indicating failure
      const errorMessage = {
        sender: "bot",
        messageBody: "Sorry, something went wrong. Please try again.",
        type: "text",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle all other messages
  const processOtherMessage = async (text) => {
    setLoading(true);
    const payload = new FormData();
    payload.append("user_input", text);
    payload.append("thread_id", threadID);

    if (firstReco) {
      payload.append("first_reco", firstReco);
    } else {
      payload.append("first_reco", false);
    }

    try {
      const response = await fetch(`${endpoint}/send_message_chat`, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log(data);
      setThreadID(data.thread_id);
      const botResponse = getBotResponse(data.assistant_response);
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      if (
        data.assistant_response.response_type.toLowerCase() === "tiles" &&
        data.assistant_response.response.query_so_far &&
        data.assistant_response.response.query_so_far.length > 0
      ) {
        const userQueryResponse = {
          sender: "bot",
          messageBody: data.assistant_response.response.query_so_far,
          type: "text",
        };
        setMessages((prevMessages) => [...prevMessages, userQueryResponse]);
      }

      if (data.assistant_response.visualize_it) {
        const matchingTile = jsonData.find(
          (tile) =>
            tile.product_name.toLowerCase() ===
            data.assistant_response.visualize_it.toLowerCase()
        );
        const visualId = matchingTile.visual_id;
        const visualMessage = {
          sender: "bot",
          messageBody: matchingTile.product_name,
          visualId: visualId,
          type: "visualize",
        };
        setMessages((prevMessages) => [...prevMessages, visualMessage]);
      }

      if (
        uploadRoomButtonCount < 2 &&
        data.assistant_response.user_want_to_upload
      ) {
        incrementUploadCount();
        setUploadRoomButtonCount();
        const uploadResponse = { sender: "bot", type: "upload" };
        setMessages((prevMessages) => [...prevMessages, uploadResponse]);
      }
      if (
        data.assistant_response.follow_up &&
        data.assistant_response.follow_up.length > 0
      ) {
        const followUpResponse = {
          sender: "bot",
          messageBody: data.assistant_response.follow_up,
          type: "text",
        };
        setMessages((prevMessages) => [...prevMessages, followUpResponse]);
      }
    } catch (error) {
      // console.error("Error:", error);

      // In case of an error, show a bot message indicating failure
      const errorMessage = {
        sender: "bot",
        messageBody: "Sorry, something went wrong. Please try again.",
        type: "text",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ChatBotModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        messages={messages}
        handleSendMessage={handleSendMessage}
        handleSelectedTile={handleSelectedTile}
        handleUpload={handleUpload}
        loading={loading}
        loadingIndex={loadingIndex}
        isCountertop={isCountertop}
      />

      <div className="absolute bottom-0 right-0">
        {/* Show homepageLogo if isLogoVisible is true */}
        {isLogoVisible ? (
          <img
            src={homepageLogo}
            alt="homepage logo"
            className="w-20 h-full cursor-pointer"
            onClick={() => {
              toggleModal(); // Toggle the modal visibility
              toggleImage(); // Toggle between images
            }}
          />
        ) : (
          // Show arrowDown if isLogoVisible is false
          <img
            src={arrowDown}
            alt="arrow down"
            className="w-20 h-full cursor-pointer"
            onClick={() => {
              toggleModal(); // Toggle the modal visibility
              toggleImage(); // Toggle between images
            }}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
