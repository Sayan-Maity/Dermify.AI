import { Flex, Image, Text } from '@chakra-ui/react'
import Shield from '../../assets/images/Shield.png'

const HealthAnalytics = () => {
    return (
        <Flex p="2rem"
            alignItems="flex-start"
            justifyContent="center"
            margin="auto"
            maxH="100vh" >
            <Flex flexDir="column" h="90vh" width="1200px" alignItems="center" justifyContent="center" gap="1rem">
                <Image src={Shield} height="10rem" />
                <Text fontSize="3rem" fontWeight="500">Coming Soon...</Text>
            </Flex>
        </Flex>
    )
}

export default HealthAnalytics
