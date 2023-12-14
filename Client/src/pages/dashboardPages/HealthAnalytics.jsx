import { Button, Checkbox, Flex, Heading, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text, Toast, useDisclosure, useTheme, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { IconStar } from '../../assets/svgs/Icons'
import DashboardWrapper from '../../components/DashboardWrapper'
const HealthAnalytics = () => {
    const theme = useTheme()
    const toast = useToast()
    const [lifestyleSleepValue, setLifestyleSleepValue] = useState(null)
    const [lifestyleExerciseValue, setLifestyleExerciseValue] = useState(null)
    const [lifestyleSunlightValue, setLifestyleSunlightValue] = useState(null)

    const [waterQuantity, setWaterQuantity] = useState(null)

    const [fruitValue, setFruitValue] = useState(0)
    const [vegetableValue, setVegetableValue] = useState(0)
    const [meatValue, setMeatValue] = useState(0)

    const [cleanserValue, setCleanserValue] = useState(0)
    const [moisurizerValue, setMoisurizerValue] = useState(0)
    const [tonerValue, setTonerValue] = useState(0)

    const [sliderValue, setSliderValue] = useState(1)
    const { isOpen: isOpenLifestyleModal, onOpen: onOpenLifestyleModal, onClose: onCloseLifestyleModal } = useDisclosure()
    const { isOpen: isOpenWaterIntakeModal, onOpen: onOpenWaterIntakeModal, onClose: onCloseWaterIntakeModal } = useDisclosure()
    const { isOpen: isOpenDietModal, onOpen: onOpenDietModal, onClose: onCloseDietModal } = useDisclosure()
    const { isOpen: isOpenSkinCareModal, onOpen: onOpenSkinCareModal, onClose: onCloseSkinCareModal } = useDisclosure()
    const { isOpen: isOpenStressModal, onOpen: onOpenStressModal, onClose: onCloseStressModal } = useDisclosure()



    const handleSliderChange = (newValues) => {
        // Ensure that the second value is always the maximum value
        const maxValue = Math.max(...newValues);
        setSliderValue(maxValue);
    };



    const submitLifestyleData = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/postLifestyleAnalyticsData`, {
                sleep: lifestyleSleepValue,
                exercise: lifestyleExerciseValue,
                sunlight: lifestyleSunlightValue
            }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            })

            if (res.status === 200) {
                setLifestyleExerciseValue(null)
                setLifestyleSleepValue(null)
                setLifestyleSunlightValue(null)
                onCloseLifestyleModal()
                toast({
                    title: "Data saved successfully !",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const submitDietData = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/postDietData`, {
                fruit: fruitValue,
                vegetable: vegetableValue,
                meat: meatValue,
            }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            })

            if (res.status === 200) {
                setFruitValue(0)
                setVegetableValue(0)
                setMeatValue(0)
                onCloseDietModal()
                toast({
                    title: "Data saved successfully !",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const submitWaterIntakeData = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/postWaterIntakeData`, {
                water: waterQuantity,
            }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            })

            if (res.status === 200) {
                setWaterQuantity(null)
                onCloseWaterIntakeModal()
                toast({
                    title: "Data saved successfully !",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const submitSkinCareData = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/postSkinCareRoutineData`, {
                moisurizer: moisurizerValue,
                cleanser: cleanserValue,
                toner: tonerValue,
            }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            })

            if (res.status === 200) {
                setCleanserValue(0)
                setMoisurizerValue(0)
                setTonerValue(0)
                onCloseSkinCareModal()
                toast({
                    title: "Data saved successfully !",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <DashboardWrapper>
            <Flex flexDir="row" width="100%" alignItems="flex-start" justifyContent="flex-start" gap="2rem" flexWrap="wrap">

                <Flex onClick={onOpenLifestyleModal} p="0.4rem" backgroundColor={theme.colors.brand.primary_green_light} borderRadius="30px">
                    <Flex flexDir="column" border={`3px solid ${theme.colors.brand.primary_green_light}`} p="1rem" gap="1rem" borderRadius="30px" h="15rem" w="30rem" alignItems="center" justifyContent="center" cursor={"pointer"} backgroundColor={theme.colors.brand.primary_green_light} _hover={{ border: "3px solid #fff" }}>
                        <Heading fontSize="1.2rem" fontWeight="500" display={"flex"} alignItems="center" gap="1rem"> <IconStar
                            width={"2.5rem"}
                            height={"2.5rem"}
                            colorStroke={"#0078aa"}
                        /> Lifestyle Analytics</Heading>
                    </Flex>
                </Flex>

                <Flex onClick={onOpenWaterIntakeModal} p="0.4rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="30px">
                    <Flex flexDir="column" border={`3px solid ${theme.colors.brand.primary_blue_light}`} p="1rem" gap="1rem" borderRadius="30px" h="15rem" w="30rem" alignItems="center" justifyContent="center" cursor={"pointer"} backgroundColor={theme.colors.brand.primary_blue_light} _hover={{ border: "3px solid #fff" }}>
                        <Heading fontSize="1.2rem" fontWeight="500" display={"flex"} alignItems="center" gap="1rem"> <IconStar
                            width={"2.5rem"}
                            height={"2.5rem"}
                            colorStroke={"#fff"}
                        /> Water Intake  Analytics</Heading>
                    </Flex>
                </Flex>

                <Flex onClick={onOpenDietModal} p="0.4rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="30px">
                    <Flex flexDir="column" border={`3px solid ${theme.colors.brand.primary_blue_light}`} p="1rem" gap="1rem" borderRadius="30px" h="15rem" w="30rem" alignItems="center" justifyContent="center" cursor={"pointer"} backgroundColor={theme.colors.brand.primary_blue_light} _hover={{ border: "3px solid #fff" }}>
                        <Heading fontSize="1.2rem" fontWeight="500" display={"flex"} alignItems="center" gap="1rem"> <IconStar
                            width={"2.5rem"}
                            height={"2.5rem"}
                            colorStroke={"#fff"}
                        /> Diet Analytics</Heading>
                    </Flex>
                </Flex>

                <Flex onClick={onOpenSkinCareModal} p="0.4rem" backgroundColor={theme.colors.brand.primary_green_light} borderRadius="30px">
                    <Flex flexDir="column" border={`3px solid ${theme.colors.brand.primary_green_light}`} p="1rem" gap="1rem" borderRadius="30px" h="15rem" w="30rem" alignItems="center" justifyContent="center" cursor={"pointer"} backgroundColor={theme.colors.brand.primary_green_light} _hover={{ border: "3px solid #fff" }}>
                        <Heading fontSize="1.2rem" fontWeight="500" display={"flex"} alignItems="center" gap="1rem"> <IconStar
                            width={"2.5rem"}
                            height={"2.5rem"}
                            colorStroke={"#0078aa"}
                        /> Skin Care Analytics</Heading>
                    </Flex>
                </Flex>
                
                {/* <Flex onClick={onOpenStressModal} flexDir="column" border="1px solid #333" p="1rem" gap="1rem" borderRadius="5px" h="15rem" w="15rem" alignItems="center" justifyContent="center" cursor={"pointer"}>
                    <Text>Skin Care Analytics</Text>
                </Flex> */}

            </Flex>

            <Modal isOpen={isOpenLifestyleModal} onClose={onCloseLifestyleModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="20px">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">LifeStyle Analytics</Heading>
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={lifestyleSleepValue} onChange={(e) => setLifestyleSleepValue(e.target.value)} placeholder="Sleep (in hours)" />
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={lifestyleExerciseValue} onChange={(e) => setLifestyleExerciseValue(e.target.value)} placeholder="Exercise (in hours)" />
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={lifestyleSunlightValue} onChange={(e) => setLifestyleSunlightValue(e.target.value)} placeholder="Exposure to Sunlight (in hours)" />
                        <Button onClick={submitLifestyleData} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenWaterIntakeModal} onClose={onCloseWaterIntakeModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="20px">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Water Intake Analytics</Heading>
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={waterQuantity} onChange={(e) => setWaterQuantity(e.target.value)} placeholder="Water (in litres)" />
                        <Button onClick={submitWaterIntakeData} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenDietModal} onClose={onCloseDietModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="20px">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Diet Analytics</Heading>
                        <Flex flexDir="column" gap="0.5rem">
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setMeatValue(e.target.checked ? 1 : 0)}>
                                Meat
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setVegetableValue(e.target.checked ? 1 : 0)}>
                                Vegetable
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setFruitValue(e.target.checked ? 1 : 0)}>
                                Fruit
                            </Checkbox>
                        </Flex>
                        <Button onClick={submitDietData} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenSkinCareModal} onClose={onCloseSkinCareModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="20px">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Skin Care Analytics</Heading>
                        <Flex flexDir="column" gap="0.5rem">
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setCleanserValue(e.target.checked ? 1 : 0)}>
                                Cleanser
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setMoisurizerValue(e.target.checked ? 1 : 0)}>
                                Moisturizer
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setTonerValue(e.target.checked ? 1 : 0)}>
                                Toner
                            </Checkbox>
                        </Flex>
                        <Button onClick={submitSkinCareData} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenStressModal} onClose={onCloseStressModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="20px">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Stress Level Analytics</Heading>
                        <Flex gap="2rem">
                            <label htmlFor="stress">Stress</label>
                            <RangeSlider id="stress" defaultValue={[0, 1]} min={0} max={3} step={1}>
                                <RangeSliderTrack bg='red.100'>
                                    <RangeSliderFilledTrack bg='tomato' />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                            </RangeSlider>
                        </Flex>
                        <Flex gap="2rem">
                            <label htmlFor="meditation">Meditation</label>
                            <RangeSlider id="meditation" defaultValue={[0, 1]} min={0} max={3} step={1}>
                                <RangeSliderTrack bg='red.100'>
                                    <RangeSliderFilledTrack bg='tomato' />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                            </RangeSlider>
                        </Flex>
                        <Flex gap="2rem">
                            <label htmlFor="relaxation">Relaxation</label>
                            <RangeSlider
                                id="relaxation"
                                defaultValue={[0, sliderValue]}
                                min={0}
                                max={3}
                                step={1}
                                onChange={handleSliderChange}
                            >
                                <RangeSliderTrack bg='red.100'>
                                    <RangeSliderFilledTrack bg='tomato' />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                            </RangeSlider>
                        </Flex>
                        <Button onClick={submitSkinCareData} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </DashboardWrapper>
    )
}

export default HealthAnalytics
