import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SkinTipItems } from "../../constants/SkinTipItems";

const Dashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentString, setCurrentString] = useState(SkinTipItems[0]);

  useEffect(() => {
    // Set up an interval to update the displayed string every 12 hours
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SkinTipItems.length);
    }, 24 * 60 * 60 * 1000);

    return () => {
      // Clean up the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, [SkinTipItems]);

  useEffect(() => {
    // Update the currentString whenever currentIndex changes
    setCurrentString(SkinTipItems[currentIndex]);
  }, [currentIndex, SkinTipItems]);
  return (
    <Flex>
      <Heading> Dashboard </Heading>
      <Flex flexDir="column">
        <Text>Tip of the day</Text>

        <Text>{currentString.title}</Text>
        <Text>{currentString.description}</Text>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
