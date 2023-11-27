import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { SkinTipItems } from "../../constants/SkinTipItems";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
ChartJS.register(LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineElement,
  Title);
import { Line } from 'react-chartjs-2';
const Dashboard = () => {
  const canvasRef = useRef(null);

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

  const userData = [
    {
      date: "15 Mar, 2003",
      sleep: 5,
    },
    {
      date: "20 Apr, 2003",
      sleep: 5.5,
    },
    {
      date: "12 May, 2003",
      sleep: 6,
    },
    {
      date: "14 Jun, 2003",
      sleep: 6,
    },
    {
      date: "30 Jul, 2003",
      sleep: 5.5,
    },
  ]
  const userData2 = [
    {
      date: "15 Mar, 2003",
      exercise: 1,
    },
    {
      date: "20 Apr, 2003",
      exercise: 0,
    },
    {
      date: "12 May, 2003",
      exercise: 1.5,
    },
    {
      date: "14 Jun, 2003",
      exercise: 0,
    },
    {
      date: "30 Jul, 2003",
      exercise: 0,
    },
  ]
  const userData3 = [
    {
      date: "15 Mar, 2003",
      sunlight: 0,
    },
    {
      date: "20 Apr, 2003",
      sunlight: 0.2,
    },
    {
      date: "12 May, 2003",
      sunlight: 1,
    },
    {
      date: "14 Jun, 2003",
      sunlight: 0,
    },
    {
      date: "30 Jul, 2003",
      sunlight: 0,
    },
  ]

  const jsonData = {
    labels: userData.map((data) => data.date),
    datasets: [
      {
        label: "Sleep",
        data: userData.map((data) => data.sleep),
        borderWidth: 2,
        backgroundColor: "#3ce2ad",
        borderColor: '#3ce2ad',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Exercise",
        data: userData2.map((data) => data.exercise),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Sunlight Exposure",
        data: userData3.map((data) => data.sunlight),
        borderWidth: 2,
        backgroundColor: "red",
        borderColor: 'red',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Time (hours)',
        },
        min: 0,
        max: 10
      },
    },
  };


  /*
  
    Analytics Topics with input fields :

    We are recommending to use at least 2 analytics to track your health.

      1. Lifestyle (daily date v/s amount of time spent on each activity)
        - Sleep
        - Exercise
        - Exposure to Sunlight
      
      2. Skincare Routine
        - Cleansing
        - Moisturizing
        - Toners

      3. Diet
        - Water Intake
        - Fruits
        - Vegetables
        - Meat
        - Dairy
      
      4. Bad Habits
        - Alcohol
        - Caffeine
        - Sugar

      5. Stress
        - Stress Level
        - Relaxation
        - Meditation
  
  */

  return (
    <Flex
      p="2rem"
      alignItems="flex-start"
      justifyContent="center"
      margin="auto"
      color="#74809A"
      maxH="100vh" overflowY="scroll"
    >
      <Flex gap="2rem" width="1200px" alignItems="flex-start" flexDir="column">
        <Heading> Dashboard </Heading>
        <Flex flexDir="column" border="1px solid #74809a" p="1rem 2rem" borderRadius="5px">
          <Text>Tip of the day</Text>

          <Text>{currentString.title}</Text>
          <Text>{currentString.description}</Text>
        </Flex>

        <Flex w="100%" >
          {userData.length > 0 ? (
            <Flex w="100%" gap="1rem">
              {/* ---------  Graph 1  -------- */}
              <Flex w="50%" h="30rem" >
                <Line ref={canvasRef} data={jsonData} options={options} height="30rem" width="100%" />
              </Flex>

              {/* ---------  Graph 2  -------- */}
              <Flex w="50%" h="30rem" >
                <Line ref={canvasRef} data={jsonData} options={options} height="30rem" width="100%" />
              </Flex>
            </Flex>
          ) : (<Text>No Data</Text>)}

        </Flex>

      </Flex>
    </Flex>
  );
};

export default Dashboard;
