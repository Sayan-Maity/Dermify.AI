import { Flex, Image, Text } from '@chakra-ui/react'
import Logo from "../assets/images/logo.png"
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <Flex width="100%" alignItems="center" justifyContent="center" >
      <Flex width={{ base: "full", xl: "1280px" }} borderTop="1px solid #bebebe" justifyContent="space-between" alignItems="center"  p="1rem 3rem">
        <Flex alignItems="center" gap="0.3rem"><AiOutlineCopyrightCircle/> Copyright 2023 | All rights reserved</Flex>
        <Flex gap="0.5rem" fontSize="1.2rem">
          <NavLink to="https://www.linkedin.com/company/100044152/admin/feed/posts/" target="_blank"><BsLinkedin/></NavLink>
          <NavLink to="/" target="_blank"><BsGithub /></NavLink>
        </Flex>
        <Flex alignItems="center" gap="0.5rem">
          <Image src={Logo} height="1.5rem"/>
          <Text fontSize="1.5rem" fontWeight="500">Dermify.AI</Text>
        </Flex>
    </Flex>
    </Flex>
  )
}

export default Footer
