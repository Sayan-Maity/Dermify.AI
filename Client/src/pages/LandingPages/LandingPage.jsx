import { Button, Flex, Image, Input, Text, Textarea, useTheme, useToast } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LandingVector from "../../assets/images/LandingVector.png";
import WhyChooseUs from "../../assets/images/WhyChooseUS.png";
import ContactUs from "../../assets/images/ContactUs.png";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Debdutta from "../../assets/developers/Debdutta.jpg"
import Sayan from "../../assets/developers/Sayan.jpg"
import Samriddhi from "../../assets/developers/Samriddhi.jpeg"
import Raj from "../../assets/developers/Raj.jpeg"
import Pritam from "../../assets/developers/Pritam.jpeg"
import Joybroto from "../../assets/developers/Joybroto.jpeg"
import { PiStethoscopeFill } from "react-icons/pi";
import FeaturedCard from "../../components/FeaturedCard";
import { FeaturedCardContent } from "../../constants/FeaturedCardContent";

const LandingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const theme = useTheme();
  const [state, handleSubmit] = useForm("xvojwqeo");
  if (state.succeeded) {
    return <p>Thank you for contacting us, we will get back you soon!</p>;
  }

  const handleComingSoon = () => {
    toast({
      title: "Coming Soon, Stay tuned",
      variant: "left-accent",
      position: "top",
      isClosable: true,
      duration: 2000,
      status: "info",
    });
  }


  return (
    <Flex flexDir="column" width="100%" alignItems="center">
      <Navbar />

      {/* -------------------------------  Landing Section  -------------------------------- */}
      <Flex width={{ base: "full", xl: "1280px" }} marginTop="6rem" p="3rem" justifyContent="space-between" flexDir="row" alignItems="center" h="100vh">
        <Flex width="50%" flexDir="column">
          <Text fontSize="4rem" lineHeight="10">AI Powered</Text>
          <Text fontSize="4rem" display="flex" gap="0.5rem" alignItems="center">Skin Diagnosis <PiStethoscopeFill color="#81efcc" /></Text>
          <Text fontSize="1.4rem"> Explore the future of dermatological care with our AI-based tool <span style={{ color: "#3ce2ad", fontWeight: "500" }}>Dermify.AI</span> which harnesses the power of image processing to offer cost-effective and accessible skin condition assessments worldwide.</Text>
          <Button
            onClick={() => navigate("/private/derma-detection")}
            loadingText="Please Wait..."
            variant="unstyled"
            mt="2rem"
            gap="0.5rem"
            p="1.5rem"
            width="fit-content"
            display="flex"
            borderRadius="30px"
            transition={"all 0.3s ease"}
            color={theme.colors.button.light_color}
            backgroundColor={theme.colors.button.light_backgroundColor}
            border="2px solid transparent"
            _hover={{
              backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
              color: `${theme.colors.button.hover_light_color}`,
              border: `${theme.colors.button.hover_light_border}`
            }}
            _active={{
              backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
            }}
          >
            Explore Now
          </Button>
        </Flex>
        <Flex width="50%" alignItems="center" justifyContent="center">
          <Image src={LandingVector} height="35rem" />
        </Flex>
      </Flex>

      {/* -------------------------------  Features Section  -------------------------------- */}
      <Flex flexDir="column" width="100%" backgroundColor="#81efcc" alignItems="center" justifyContent="center">
        <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="column" alignItems="center" >
          <Text fontSize="3rem" fontWeight="500" textAlign="center" >Features</Text>
          <Text fontSize="1.5rem" fontWeight="400" textAlign="center" >Enjoy our 3 best AI features to help you with Derma Disease Detection</Text>
        </Flex>

        <Flex width={{ base: "full", xl: "1280px" }} p="3rem" flexDir="row" flexWrap="wrap" gap="3rem 1rem" justifyContent="center" alignItems="center">

          <FeaturedCard featuredItem={FeaturedCardContent[0]} />
          <FeaturedCard featuredItem={FeaturedCardContent[1]} />
          <FeaturedCard featuredItem={FeaturedCardContent[2]} />
          <FeaturedCard featuredItem={FeaturedCardContent[3]} />
          <FeaturedCard featuredItem={FeaturedCardContent[4]} />

        </Flex>
      </Flex>

      {/* -------------------------------  About Us Section  -------------------------------- */}
      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="column" alignItems="center" >
        <Text fontSize="3rem" fontWeight="500" textAlign="center" >Why Choose Us?</Text>
        <Text fontSize="1.5rem" fontWeight="400" textAlign="center" >We are a team of 3 students from BITS Pilani, Goa Campus</Text>
      </Flex>

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="space-between" flexDir="row" alignItems="center" >
        <Flex width="50%" alignItems="center" justifyContent="center">
          <Image src={WhyChooseUs} height="30rem" />
        </Flex>
        <Flex width="50%" >
          Welcome to Dermify.AI
        </Flex>
      </Flex>

      {/* -------------------------------  Developers Team Section  -------------------------------- */}
      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="column" alignItems="center" >
        <Text fontSize="3rem" fontWeight="500" textAlign="center" >Meet our Developers</Text>
        <Text fontSize="1.5rem" fontWeight="400" textAlign="center" >We are a team of 6 students majoring in CSE from UEM, Saltlake</Text>
      </Flex>

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="row" alignItems="center" gap="1rem" flexWrap="wrap">
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
          <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Image src={Sayan} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
          </Flex>
          <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
            <Text fontSize="1.2rem" >Sayan Maity</Text>
            <Button
              target="_blank"

              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="30px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Meet
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
          <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Image src={Joybroto} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
          </Flex>
          <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
            <Text fontSize="1.2rem" >Joybroto Das</Text>
            <Button
              target="_blank"

              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="30px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Meet
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
          <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Image src={Pritam} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
          </Flex>
          <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
            <Text fontSize="1.2rem" >Pritam Dey</Text>
            <Button
              target="_blank"

              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="30px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Meet
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
          <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Image src={Samriddhi} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
          </Flex>
          <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
            <Text fontSize="1.2rem" >Samriddhi Halder</Text>
            <Button
              target="_blank"

              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="30px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Meet
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
          <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Image src={Raj} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
          </Flex>
          <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
            <Text fontSize="1.2rem" >Raj Bhowmik</Text>
            <Button
              target="_blank"

              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="30px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Meet
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
          <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
            <Image src={Debdutta} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
          </Flex>
          <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
            <Text fontSize="1.2rem" >Debdutta Basu</Text>
            <Button
              target="_blank"

              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="30px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Meet
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* -------------------------------  Contact Us Section  -------------------------------- */}
      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="column" alignItems="center" >
        <Text fontSize="3rem" fontWeight="500" textAlign="center" >Contact Us</Text>
        <Text fontSize="1.5rem" fontWeight="400" textAlign="center" >We are a team of 3 students from BITS Pilani, Goa Campus</Text>
      </Flex>

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="space-between" flexDir="row" alignItems="center" >
        <Flex width="50%" >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "90%", gap: "1rem" }}>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email*"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <Textarea
              id="message"
              name="message"
              placeholder="Write your query here*"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Button type="submit" backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
              backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
              color: `${theme.colors.button.hover_light_color}`,
              border: `${theme.colors.button.hover_light_border}`
            }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
            {/* <Button type="submit" disabled={state.submitting}>
              Submit
            </Button> */}
          </form>
        </Flex>
        <Flex width="50%" alignItems="center" justifyContent="center">
          <Image src={ContactUs} height="30rem" />
        </Flex>
      </Flex>

      <Footer />


    </Flex>
  );
};

export default LandingPage;
