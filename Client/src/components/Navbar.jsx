import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { Button, Flex, Image, Text, useTheme } from "@chakra-ui/react";
import Logo from "../assets/images/logo.png"

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate()


  return (
    <Flex width="100%" alignItems="center" justifyContent="center" mt="1rem" pos="fixed" zIndex="100">
      <Flex width={{ base: "full", xl: "1280px" }} borderRadius="5px" justifyContent="space-between"  p="1rem 3rem" boxShadow="0 2px 3px #bebebe" backdropFilter="blur(8px)" >
        <Flex alignItems="center" gap="1rem">
          <Image src={Logo} alt="Dermify.AI logo" />
          <Text fontSize="1.5rem" fontWeight="500">Dermify.AI</Text>
        </Flex>
        <Flex >
          {Cookies.get("token") ? (
            <Button Button onClick={() => navigate("/private/derma-detection")} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
              backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
              color: `${theme.colors.button.hover_light_color}`,
              border: `${theme.colors.button.hover_light_border}`
            }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Dashboard</Button>
          ) : (
            <Flex gap="1rem">
              <Button Button onClick={() => navigate("/login")} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Login</Button>
              <Button Button onClick={() => navigate("/register")} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Register</Button>
            </Flex>
          )}
        </Flex>
      </Flex >
    </Flex >
  );
};

export default Navbar;