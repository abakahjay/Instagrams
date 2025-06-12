import { Link } from "react-router-dom";
import "./homepage.css";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Navbar from "../../components/NavBar/Navbar.jsx"
import { Box } from "@chakra-ui/react";
// import ScrambledText from '../../style/ScrambledText.jsx';

const Homepage = ({ authUser }) => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <>
      <Navbar authUser={authUser} />
      <div className="homepage" >
        <img src="/orbital.png" alt="" className="orbital" />
        <div className="left">
          <h1>GH-GPT</h1>
          <h2>Boost Creativity. Work Smarter.</h2>
          <h3>
            Your intelligent assistant for writing, coding, and idea generation —
            designed to help you move faster and think bigger.
          </h3>
          {/* <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars='.:'
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Similique pariatur dignissimos porro eius quam doloremque
              et enim velit nobis maxime.
            </ScrambledText> */}
          <Link to="/dashboard">Get Started</Link>
        </div>
        <div className="right">
          <div className="imgContainer">
            <div className="bgContainer">
              <div className="bg"></div>
            </div>
            <img src="/bot.png" alt="" className="bot" />
            <div className="chat">
              <img
                src={
                  typingStatus === "human1"
                    ? "/human1.jpeg"
                    : typingStatus === "human2"
                      ? "/human2.jpeg"
                      : "bot.png"
                }
                alt=""
              />
              <TypeAnimation
                sequence={[
                  // Productivity
                  "User: Summarize this 10-page PDF for me.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Done. Here's a 3-paragraph summary with key bullet points.",
                  2000,
                  () => setTypingStatus("human2"),
                  "User: Can you rewrite this in simpler English?",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Sure. Here's the revised version with improved clarity.",
                  2000,

                  // Developer
                  () => setTypingStatus("human1"),
                  "User: Convert this Python function to JavaScript.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Converted! Here's the JavaScript version of your code.",
                  2000,
                  () => setTypingStatus("human2"),
                  "User: Explain how OAuth 2.0 works in simple terms.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: It's like a valet key to access data without sharing passwords.",
                  2000,

                  // Academic
                  () => setTypingStatus("human1"),
                  "Student: Can you explain Newton's second law?",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Sure! F = ma — force equals mass times acceleration.",
                  2000,
                  () => setTypingStatus("human2"),
                  "Student: Help me cite this article in APA.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Here's the correct APA format for your reference.",
                  2000,

                  // Business
                  () => setTypingStatus("human1"),
                  "Manager: Create a weekly meeting agenda.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Here's a structured agenda with time slots.",
                  2000,
                  () => setTypingStatus("human2"),
                  "Manager: Write a job description for a React developer.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Here's a complete job posting template.",
                  2000,

                  // Creative
                  () => setTypingStatus("human1"),
                  "Writer: Start a short story about a lost robot.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: In a forgotten scrapyard, a robot blinked awake for the first time...",
                  2000,
                  () => setTypingStatus("human2"),
                  "Writer: Suggest 5 titles for a sci-fi novel.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Here's a list of futuristic and engaging titles.",
                  2000,

                  // Customer Service
                  () => setTypingStatus("human1"),
                  "User: What’s your refund policy?",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: You can request a full refund within 30 days — no questions asked.",
                  2000,
                  () => setTypingStatus("human2"),
                  "User: I need help resetting my password.",
                  2000,
                  () => setTypingStatus("bot"),
                  "GH-GPT: Follow this secure link to reset it instantly.",
                  2000,
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
              />

            </div>
          </div>
        </div>
        <div className="terms">
          <img src="/fav.svg" alt="" />
          <div className="links">
            <Link to="/">Terms of Service</Link>
            <span>|</span>
            <Link to="/">Privacy Policy</Link>
          </div>
          <Box fontSize={12} color={'gray.500'} mt={5}>
              Copyright &copy; {new Date().getFullYear()} Built By{" "}
              <Link to='https://abakahjay.github.io/web_project/' target='_blank' color='blue.500' fontSize={14} alignSelf={'start'}>
                          Abakah Joshua
              </Link>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Homepage;




// import { Box, Flex, Heading, Text, Button, Image, Link as ChakraLink, useBreakpointValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { TypeAnimation } from "react-type-animation";
// import Navbar from "../../components/NavBar/Navbar.jsx";

// const Homepage = ({ authUser }) => {
//   const [typingStatus, setTypingStatus] = useState("human1");

//   const isMobile = useBreakpointValue({ base: true, md: false });

//   return (
//     <>
//       <Navbar authUser={authUser} />
//       <Box
//         position="relative"
//         w="100%"
//         h="100vh"
//         overflow="hidden"
//         px={{ base: 4, md: 20 }}
//         pt={{ base: 8, md: 0 }}
//       >
//         <Image
//           src="/orbital.png"
//           position="absolute"
//           bottom="0"
//           left="0"
//           opacity="0.05"
//           animation="rotateOrbital 100s linear infinite"
//           zIndex="-1"
//         />
//         <Flex
//           direction={{ base: "column", lg: "row" }}
//           align="center"
//           justify="center"
//           gap={10}
//           h="full"
//         >
//           {/* LEFT SECTION */}
//           <Flex
//             flex="1"
//             direction="column"
//             align="center"
//             textAlign="center"
//             gap={4}
//           >
//             <Heading
//               fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
//               bgGradient="linear(to-r, #ce1126, #fcd116, #007940)"
//               bgClip="text"
//             >
//               GH-GPT
//             </Heading>
//             <Heading fontSize={{ base: "lg", md: "2xl" }} fontWeight="semibold">
//               Boost Creativity. Work Smarter.
//             </Heading>
//             <Text maxW={{ base: "90%", md: "70%" }} fontSize="md">
//               Your intelligent assistant for writing, coding, and idea generation —
//               designed to help you move faster and think bigger.
//             </Text>
//             <Link to="/dashboard">
//               <Button
//                 colorScheme="blue"
//                 size="lg"
//                 mt={4}
//                 _hover={{ bg: "white", color: "#217bfe", border: "1px solid #217bfe" }}
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </Flex>

//           {/* RIGHT SECTION */}
//           <Flex flex="1" align="center" justify="center">
//             <Box
//               bg="#140e2d"
//               borderRadius="2xl"
//               w={{ base: "100%", md: "80%" }}
//               h={{ base: "auto", md: "60%" }}
//               p={4}
//               position="relative"
//               overflow="hidden"
//             >
//               {/* Background animation */}
//               <Box
//                 position="absolute"
//                 top="0"
//                 left="0"
//                 w="200%"
//                 h="100%"
//                 opacity="0.2"
//                 backgroundImage="url('/bg.png')"
//                 backgroundSize="auto 100%"
//                 animation="slideBg 8s ease-in-out infinite alternate"
//                 zIndex="0"
//               />

//               {/* Bot image */}
//               <Image
//                 src="/bot.png"
//                 w="full"
//                 h="full"
//                 objectFit="contain"
//                 animation="botAnimate 3s ease-in-out infinite alternate"
//                 zIndex="1"
//               />

//               {/* Chat Bubble */}
//               {!isMobile && (
//                 <Flex
//                   position="absolute"
//                   bottom="-30px"
//                   right={{ base: "0", md: "-50px" }}
//                   align="center"
//                   bg="#2c2937"
//                   p={4}
//                   borderRadius="md"
//                   gap={2}
//                   zIndex="2"
//                 >
//                   <Image
//                     src={
//                       typingStatus === "human1"
//                         ? "/human1.jpeg"
//                         : typingStatus === "human2"
//                         ? "/human2.jpeg"
//                         : "/bot.png"
//                     }
//                     w="32px"
//                     h="32px"
//                     borderRadius="full"
//                     objectFit="cover"
//                   />
//                   <TypeAnimation
//   sequence={[
//     // Productivity
//     "User: Summarize this 10-page PDF for me.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Done. Here's a 3-paragraph summary with key bullet points.",
//     2000,
//     () => setTypingStatus("human2"),
//     "User: Can you rewrite this in simpler English?",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Sure. Here's the revised version with improved clarity.",
//     2000,

//     // Developer
//     () => setTypingStatus("human1"),
//     "User: Convert this Python function to JavaScript.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Converted! Here's the JavaScript version of your code.",
//     2000,
//     () => setTypingStatus("human2"),
//     "User: Explain how OAuth 2.0 works in simple terms.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: It's like a valet key to access data without sharing passwords.",
//     2000,

//     // Academic
//     () => setTypingStatus("human1"),
//     "Student: Can you explain Newton's second law?",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Sure! F = ma — force equals mass times acceleration.",
//     2000,
//     () => setTypingStatus("human2"),
//     "Student: Help me cite this article in APA.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Here's the correct APA format for your reference.",
//     2000,

//     // Business
//     () => setTypingStatus("human1"),
//     "Manager: Create a weekly meeting agenda.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Here's a structured agenda with time slots.",
//     2000,
//     () => setTypingStatus("human2"),
//     "Manager: Write a job description for a React developer.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Here's a complete job posting template.",
//     2000,

//     // Creative
//     () => setTypingStatus("human1"),
//     "Writer: Start a short story about a lost robot.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: In a forgotten scrapyard, a robot blinked awake for the first time...",
//     2000,
//     () => setTypingStatus("human2"),
//     "Writer: Suggest 5 titles for a sci-fi novel.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Here's a list of futuristic and engaging titles.",
//     2000,

//     // Customer Service
//     () => setTypingStatus("human1"),
//     "User: What’s your refund policy?",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: You can request a full refund within 30 days — no questions asked.",
//     2000,
//     () => setTypingStatus("human2"),
//     "User: I need help resetting my password.",
//     2000,
//     () => setTypingStatus("bot"),
//     "GH-GPT: Follow this secure link to reset it instantly.",
//     2000,
//   ]}
//   wrapper="span"
//   repeat={Infinity}
//   cursor={true}
//   omitDeletionAnimation={true}
// />

//                 </Flex>
//               )}
//             </Box>
//           </Flex>
//         </Flex>

//         {/* Terms & Logo */}
//         <Flex
//           direction="column"
//           align="center"
//           position="absolute"
//           bottom="4"
//           left="50%"
//           transform="translateX(-50%)"
//           fontSize="xs"
//           color="gray.500"
//         >
//           <Image src="/logo1.png" w="16px" h="16px" mb="2" />
//           <Flex gap={2}>
//             <ChakraLink as={Link} to="/">Terms of Service</ChakraLink>
//             <Text>|</Text>
//             <ChakraLink as={Link} to="/">Privacy Policy</ChakraLink>
//           </Flex>
//         </Flex>
//       </Box>
//     </>
//   );
// };

// export default Homepage;
