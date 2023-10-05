import { Button, Flex, Input, ListItem, Text, UnorderedList, useTheme } from "@chakra-ui/react";
import { SkinDiseaseItems } from "../../constants/SkinDiseaseItems"
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

const Page3 = () => {
  const theme = useTheme()
  const [diseaseName, setDiseaseName] = useState("")
  const [loading, setLoading] = useState(false)
  console.log("Disease name =>", diseaseName)
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [diseaseInformation, setDiseaseInformation] = useState([])
  const [showDiseaseName, setShowDiseaseName] = useState("")

  const handleOpenAIApiCall = async (data) => {
    setDiseaseInformation([])
    setShowDiseaseName(data)
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/educationPrompt`,
        {
          disease: data,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        console.log(response.data.gptPrompt.content);
        const jsonResponse = response.data.gptPrompt.content;

        // Parse the JSON string into a JavaScript object
        const parsedData = JSON.parse(jsonResponse);
        setDiseaseInformation(parsedData)
        console.log("Parsed data =>", parsedData)
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [initialItems, setInitialItems] = useState([]);

  useEffect(() => {
    // Initialize filteredItems and initialItems with all items initially
    setFilteredItems(SkinDiseaseItems);
    setInitialItems(SkinDiseaseItems);
  }, []);

  const handleFilterSkinDisease = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter your list based on the input text
    const filteredDisease = initialItems.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredItems(filteredDisease);
  }

  return (
    <Flex p="2rem"
      // backgroundColor="#ebfffe"
      alignItems="flex-start"
      justifyContent="center"
      margin="auto"
      color="#74809A" maxH="100vh" >
      <Flex width="1200px" alignItems="flex-start">
        <Flex width="25rem" flexDir="column" alignItems="center" borderRight="1px solid #333" pr="1rem" gap="1rem" maxH="100vh" h="90vh" overflowY="scroll">
          <Flex gap="1rem">
            <Input type="text" placeholder="Search here ..." value={searchText} onChange={handleFilterSkinDisease} />
            <Button onClick={() => handleOpenAIApiCall(searchText)} isLoading={loading}><BsSearch /></Button>
          </Flex>

          <Flex flexDir="column" gap="1rem" width="100%">

            {filteredItems.map((item, index) => (
              <Button isDisabled={loading} variant="unstyled" textAlign="left" fontWeight="500" color="#333" key={index} onClick={() => { setDiseaseName(item); handleOpenAIApiCall(item) }} p="0.5rem 2rem" backgroundColor="#81efcc" cursor="pointer" borderRadius="5px">
                <Text>{item}</Text>
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex color="#333" width="100%" maxH="100vh" h="90vh" overflowY="scroll" alignItems="flex-start" justifyContent="center" p="0 1rem">
          {diseaseInformation.length > 0 && (<Flex flexDir="column">

            <Flex gap="1rem" p="0.5rem 1rem" >
              <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem"><strong>Name</strong></Text>
              <Text width="100%">{diseaseInformation[0]?.name}</Text>
            </Flex>
            <Flex gap="1rem" p="0.5rem 1rem">
              <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Description</strong></Text>
              <Text width="100%">{diseaseInformation[0]?.description}</Text>
            </Flex>
            <Flex gap="1rem" p="0.5rem 1rem">
              <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Symptoms</strong></Text>
              <Flex width="100%">
                <UnorderedList>
                  {diseaseInformation[0]?.symptoms?.map((symptom, index) => (
                    <ListItem key={index}>{symptom}</ListItem>
                  ))}
                </UnorderedList>
              </Flex>
            </Flex>
            <Flex gap="1rem" p="0.5rem 1rem">
              <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Causes</strong></Text>
              <Flex width="100%">
                <UnorderedList>
                  {diseaseInformation[0]?.causes?.map((cause, index) => (
                    <ListItem key={index}>{cause}</ListItem>
                  ))}
                </UnorderedList>
              </Flex>
            </Flex>
            <Flex gap="1rem" p="0.5rem 1rem">
              <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Prevention</strong></Text>
              <Flex width="100%">
                <UnorderedList>
                  {diseaseInformation[0]?.prevention?.map((prevention, index) => (
                    <ListItem key={index}>{prevention}</ListItem>
                  ))}
                </UnorderedList>
              </Flex>
            </Flex>
          </Flex>)}
          <Flex height="90vh" alignItems="center">
            {diseaseInformation.length === 0 && (<Flex><Text>{loading ? `😃 Fetching all the information about ${showDiseaseName}` : "👋 Please select any particular disease or search about it !"}</Text></Flex>)}
          </Flex>
        </Flex>
      </Flex>



    </Flex >
  );
};

export default Page3;
