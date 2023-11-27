import { Button, Flex, Input, ListItem, Text, UnorderedList, useTheme, useToast } from "@chakra-ui/react";
import { SkinDiseaseItems } from "../../constants/SkinDiseaseItems"
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

const Page3 = () => {
  const toast = useToast();
  const theme = useTheme()
  const [diseaseName, setDiseaseName] = useState("")
  const [loading, setLoading] = useState(false)
  console.log("Disease name =>", diseaseName)
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [diseaseInformation, setDiseaseInformation] = useState({})
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
        toast({
          title: "Disease Generated Successfully",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });

        console.log(response);
        setDiseaseInformation(jsonParser(response.data))
      } else {
        setLoading(false);
        toast({
          title: "Sorry, couldn't generate disease",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
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

  const jsonParser = (response) => {
    try {
      if (response && response.content) {
        const jsonRegex = /```json\s*([\s\S]+)\s*```/; // Define a regular expression
        const match = response.content.match(jsonRegex); // Extract the JSON string

        if (match && match[1]) {
          const trimmedJsonStr = match[1].trim(); // Remove leading and trailing whitespaces
          const jsonObj = JSON.parse(trimmedJsonStr);

          // console.log("here =>", jsonObj);
          return jsonObj;
        } else {
          console.error('No JSON object found in the response.');
          return null;
        }
      } else {
        console.error('Invalid response format. No content property found.');
        return null;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
      return null;
    }
  };

  return (
    <Flex p="2rem"
      // backgroundColor="#ebfffe"
      alignItems="flex-start"
      justifyContent="center"
      margin="auto"
      color="#74809A" maxH="100vh" >
      <Flex width="1200px" alignItems="flex-start">
        <Flex width="40%" flexDir="column" alignItems="center" borderRight="1px solid #333" pr="1rem" gap="1rem" maxH="100vh" h="90vh" overflowY="scroll">
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
        <Flex color="#333" width="100%" maxH="100vh" h="90vh" overflowY="scroll" alignItems="flex-start" justifyContent="flex-start" p="0 1rem">
          {!diseaseInformation?.description !== "" && (
            <Flex flexDir="column">
              <Flex gap="1rem" p="0.5rem 1rem" >
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem"><strong>Name</strong></Text>
                <Text width="100%">{diseaseInformation?.name}</Text>
              </Flex>
              <Flex gap="1rem" p="0.5rem 1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Description</strong></Text>
                <Text width="100%">{diseaseInformation?.description}</Text>
              </Flex>
              <Flex gap="1rem" p="0.5rem 1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Symptoms</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {diseaseInformation?.symptoms?.map((symptom, index) => (
                      <ListItem key={index}>{symptom}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
              <Flex gap="1rem" p="0.5rem 1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Causes</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {diseaseInformation?.causes?.map((cause, index) => (
                      <ListItem key={index}>{cause}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
              <Flex gap="1rem" p="0.5rem 1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="5px" p="0.5rem 1rem" height="fit-content"><strong>Prevention</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {diseaseInformation?.prevention?.map((prevention, index) => (
                      <ListItem key={index}>{prevention}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Flex height="90vh" alignItems="center">
            {diseaseInformation?.name?.length === 0 && (
              <Flex>
                <Text>{loading ? `😃 Fetching all the information about ${showDiseaseName}` : "👋 Please select any particular disease or search about it !"}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>



    </Flex >
  );
};

export default Page3;
