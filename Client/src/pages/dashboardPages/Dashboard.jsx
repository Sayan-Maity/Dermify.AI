import { Flex, HStack, Heading, Text, VStack, useTheme } from "@chakra-ui/react";
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
import axios from "axios";
import Cookies from "js-cookie";
import { IconStar } from "../../assets/svgs/Icons";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper";

const Dashboard = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentString, setCurrentString] = useState(SkinTipItems[0]);
  const [lifeStyleData, setLifeStyleData] = useState([])
  const [waterIntakeData, setWaterIntakeData] = useState([])

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


  useEffect(() => {
    const getLifestyleData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/getLifestyleAnalyticsData`,
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("token")
            }
          }
        )
        if (res.status === 200) {
          setLifeStyleData(res.data.data)
          console.log(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getLifestyleData()
  }, [])

  // console.log("LifeStyleData", lifeStyleData)

  useEffect(() => {
    const getWaterIntakeData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/getWaterIntakeData`,
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("token")
            }
          }
        )
        if (res.status === 200) {
          setWaterIntakeData(res.data.data)
          console.log(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getWaterIntakeData()
  }, [])

  console.log("WaterIntakeData", waterIntakeData)


  const jsonData = {
    labels: lifeStyleData?.map((data) => data.date),
    datasets: [
      {
        label: "Sleep",
        data: lifeStyleData?.map((data) => data.sleep),
        borderWidth: 2,
        backgroundColor: "#3ce2ad",
        borderColor: '#3ce2ad',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Exercise",
        data: lifeStyleData?.map((data) => data.exercise),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Sunlight Exposure",
        data: lifeStyleData?.map((data) => data.sunlight),
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


  const jsonData2 = {
    labels: waterIntakeData?.map((data) => data.date),
    datasets: [
      {
        label: "Water",
        data: waterIntakeData?.map((data) => data.water),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options2 = {
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
          text: 'Water (Litres)',
        },
        min: 0,
        max: 5
      },
    },
  };


  /*
  
    Analytics Topics with input fields :

    We are recommending to use at least 2 analytics to track your health.

      1. Lifestyle (daily date v/s amount of time spent on each activity) (line chart)
        - Sleep
        - Exercise
        - Exposure to Sunlight
      
      2. Skincare Routine (checkbox)
        - Cleanser
        - Moisturizer
        - Toner

      3. Diet (checkbox) (Bar chart)
        - Fruits
        - Vegetables
        - Meat
        
      4. Water Intake (Quantity in litres) (line chart)
        - Water

      5. Stress (measure in 3 levels : low, moderate, high) (line chart)
        - Stress Level
        - Relaxation
        - Meditation
  
  */

  return (
    <DashboardWrapper>
      <Flex gap="2rem" width="1200px" alignItems="flex-start" flexDir="column">
        <Heading fontSize="2rem"> Your Dashboard </Heading>
        <Flex flexDir="column" border="1px solid #74809a" p="1rem 2rem" borderRadius="5px">
          <HStack >
            <IconStar
              width={"1.5rem"}
              height={"1.5rem"}
              colorStroke={"#3ce2ad"}
            />
            <Text fontSize="1.2rem" fontWeight={"bold"} color={theme.colors.brand.primary_green_dark}>Tip of the day</Text>
          </HStack>
          <Text>{currentString.title} :</Text>
          <Text>{currentString.description}</Text>
        </Flex>

        <Flex w="100%" >
          {lifeStyleData?.length > 0 || waterIntakeData?.length > 0 ? (
            <Flex w="100%" gap="1rem">
              {/* ---------  Lifestyle Graph  -------- */}
              {lifeStyleData?.length > 0 && (
                <Flex w="50%" h="30rem" >
                  <Line ref={canvasRef} data={jsonData} options={options} height="30rem" width="100%" />
                </Flex>
              )}

              {/* ---------  Water Intake Graph  -------- */}
              {waterIntakeData?.length > 0 && (
                <Flex w="50%" h="30rem" >
                  <Line ref={canvasRef} data={jsonData2} options={options2} height="30rem" width="100%" />
                </Flex>

              )}

            </Flex>
          ) : (
            <HStack alignItems="flex-start" justifyContent="flex-start">
              <Text>Want to check your daily Skin Care analytics ?</Text>
              <Text color={theme.colors.brand.primary_green_dark} _hover={{ textDecoration: "underline" }}>
                <Link to="/private/health-analytics" >Click here</Link>
              </Text>

            </HStack>
          )}

        </Flex>

      </Flex>
    </DashboardWrapper>
  );
};

export default Dashboard;
