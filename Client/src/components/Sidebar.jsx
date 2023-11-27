import {
    Divider,
    Flex,
    IconButton,
    Image,
    Menu,
    MenuButton,
    Text,
    useTheme,
    useToast,
  } from "@chakra-ui/react";
  import { useContext, useState } from "react";
  import { PiMagicWand } from "react-icons/pi";
  import { PiStethoscopeFill } from "react-icons/pi";
  import { BiLogOut, BiArrowBack, BiLineChart, BiCheckShield } from "react-icons/bi";
  import { MdOutlineSpaceDashboard } from "react-icons/md";
  import { BsBriefcase, BsChatSquareHeart } from "react-icons/bs";
  import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import { magic } from "../utils/magic";
import Cookies from "js-cookie";
import Logo from "../assets/images/logo.png"
import { SidebarMainItems } from "../constants/SidebarItems";
const iconComponentsMenuItems = {
    MdOutlineSpaceDashboard,
    PiStethoscopeFill,
    BsBriefcase,
    PiMagicWand,
    BiLineChart,
    BsChatSquareHeart, 
    BiCheckShield
  };

const Sidebar = () => {
    const theme = useTheme();
    const toast = useToast();
    const [navSize, setNavSize] = useState("large");
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext)
  
    const handleLogoutBtn = () => {
  
      magic.user.logout().then(() => {
        toast({
          title: "Logged out successfully",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
        setUser({ user: null });
        Cookies.remove("token");
        navigate("/");
      });
    };
  return (
    <Flex
        pos="sticky"
        p={4}
        h="100vh"
        w={navSize === "small" ? "5rem" : "17rem"}
        flexDir="column"
        justifyContent="space-between"
        borderRight={`1px solid ${theme.colors.border}`}
        //   left="5"
        //   boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        //   backgroundColor="red.100"
        transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
      >
        <Flex flexDir="column" alignItems="center">
          <Flex flexDir="row" alignItems="center" as="nav" w="100%">
            <Flex alignItems="center" h={12}>
              {navSize === "small" ? (
                <Image src={Logo} alt="Dermify.AI logo" />
              ) : (
                <Flex alignItems="center" gap="1rem" width="100%">
                  <Image src={Logo} alt="Dermify.AI logo" />
                  <Text fontSize="1.5rem" fontWeight="bold" color="#333">Dermify.AI</Text>
                </Flex>
              )}
            </Flex>
            <IconButton
              transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
              transform={
                navSize === "small"
                  ? "translateX(2.7rem)"
                  : "translateX(12.7rem)"
              }
              pos="absolute"
              background="#f2f2f4"
              borderRadius="20px"
              mt={5}
              _hover={{ background: "#c8c8c8" }}
              icon={
                navSize === "small" ? <IoIosArrowForward /> : <IoIosArrowBack />
              }
              onClick={() => {
                navSize === "small" ? setNavSize("large") : setNavSize("small");
              }}
            />
          </Flex>

          {/* ------------------------------  MENU ITEMS  ------------------------------ */}
          <Flex
            flexDir="column"
            alignItems="flex-start"
            mt={30}
            w={navSize === "small" ? "100%" : "13rem"}
            >
            <Text
              wordBreak="keep-all"
              flexWrap="nowrap"
              ml={5}
              color="#333"
              fontSize="12px"
              display={navSize === "small" ? "none" : "flex"}
              >
              MENU
            </Text>
            {SidebarMainItems.map((item, index) => {
              const IconComponent = iconComponentsMenuItems[item.icon];
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  to={item?.path}
                  style={{
                    width: "100%",
                    backgroundColor: `${isActive ? theme.colors.brand.primary_green_light : "transparent"}`,
                    // color: `${isActive ? "red" : "#333"}`,
                    borderRadius: "20px",
                  }}
                  key={index}
                >
                  <Flex
                    alignItems={navSize === "small" ? "center" : "flex-start"} borderRadius="20px"
                  >
                    <Menu placement="right">
                      <Text
                        padding="0.4rem 1rem"
                        borderRadius="20px"
                        _hover={{
                          textDecor: "none",
                          backgroundColor: theme.colors.brand.primary_green_light,
                        }}
                        w={navSize === "large" && "100%"}
                      >
                        <MenuButton>
                          <Flex align="center">
                            <IconComponent
                              style={{
                                fontSize: "1.4rem",
                                color: "#333",
                              }}
                            />
                            <Text
                              fontSize="14px"
                              ml={5}
                              style={{
                                color: "#333",
                              }}
                              display={navSize === "small" ? "none" : "flex"}
                            >
                              {item?.title}
                            </Text>
                          </Flex>
                        </MenuButton>
                      </Text>
                    </Menu>
                  </Flex>
                </NavLink>
              );
            })}
          </Flex>
          {/* ------------------------------  MENU ITEMS  ------------------------------ */}

        </Flex>
        <Flex
          flexDir="column"
          alignItems="flex-start"
          mt={30}
          w={navSize === "small" ? "100%" : "13rem"}
        >
          <Divider display={navSize === "small" ? "none" : "flex"} />

          <NavLink
            to="/"
            style={{
              width: "100%",
              borderRadius: "20px"
            }}
          >
            <Flex alignItems={navSize === "small" ? "center" : "flex-start"}>
              <Menu placement="right">
                <Text
                  padding="0.4rem 1rem"
                  borderRadius="20px"
                  _hover={{
                    textDecor: "none",
                    backgroundColor: theme.colors.brand.primary_green_light,
                  }}
                  w={navSize === "large" && "100%"}
                >
                  <MenuButton>
                    <Flex align="center">
                      <BiArrowBack fontSize="1.4rem" />
                      <Text
                        fontSize="14px"
                        ml={5}
                        display={navSize === "small" ? "none" : "flex"}
                      >
                        Home
                      </Text>
                    </Flex>
                  </MenuButton>
                </Text>
              </Menu>
            </Flex>
          </NavLink>
          <button
            onClick={() => handleLogoutBtn()}
            style={{
              width: "100%",
              textAlign: "left",
            }}
          >
            <Flex alignItems={navSize === "small" ? "center" : "flex-start"}>
              <Menu placement="right">
                <Text
                  padding="0.4rem 1rem"
                  borderRadius="20px"
                  _hover={{
                    textDecor: "none",
                    backgroundColor: theme.colors.brand.primary_green_light,
                  }}
                  w={navSize === "large" && "100%"}
                >
                  <MenuButton>
                    <Flex align="center">
                      <BiLogOut fontSize="1.4rem" />
                      <Text
                        fontSize="14px"
                        ml={5}
                        display={navSize === "small" ? "none" : "flex"}
                      >
                        Logout
                      </Text>
                    </Flex>
                  </MenuButton>
                </Text>
              </Menu>
            </Flex>
          </button>
        </Flex>
      </Flex>
  )
}

export default Sidebar
