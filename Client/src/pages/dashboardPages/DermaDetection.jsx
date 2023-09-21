import { useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Image,
  Input,
  ListItem,
  Select,
  Text,
  UnorderedList,
  background,
  useTheme,
  useToast,
} from "@chakra-ui/react";

const DermaDetection = () => {
  const theme = useTheme();
  const toast = useToast();
  const [browsedImagesArray, setBrowsedImagesArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataUri, setDataUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const [conditionsData, setConditionsData] = useState([]);
  const [language, setLanguage] = useState("English");
  const [symptomPrompt, setSymptomPrompt] = useState("");

  const handleMultipleImages = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files);
    setBrowsedImagesArray(imageArray);
  };
  const handleImageChange = (index) => {
    const selectedImage = browsedImagesArray[index];
    setSelectedImage(selectedImage);

    // Selected image converted into Data URI format:
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setDataUri(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!dataUri) {
      setLoading(false);
      toast({
        title: "Please upload an image !",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://bilalsardar-skin-diseases-classification.hf.space/run/predict",
        { data: [dataUri] }
      );
      if (res.status === 200) {
        // console.log(res.data.data[0]);
        handleOpenAIApiCall(res.data.data[0]);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSelectLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleOpenAIApiCall = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/dermaFinalPrompt",
        {
          userPrompt: data,
          language: language,
          symptomPrompt: symptomPrompt,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        console.log(response.data.gptPrompt.content);
        const jsonResponse = response.data.gptPrompt.content;

        // Parse the JSON string into a JavaScript object
        const parsedData = JSON.parse(jsonResponse);
        setConditionsData(parsedData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Flex
      p="2rem"
      alignItems="flex-start"
      justifyContent="center"
      margin="auto"
      color="#74809A"
      maxH="100vh" overflowY="scroll"
    >
      <Flex gap="2rem" width="1200px" alignItems="flex-start">
        <Flex flexDir="column" width="40%" gap="1rem">
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          <label
            htmlFor="imageFile"
            className="custom-imageFile-input-magicWand"
            style={{
              backgroundImage: dataUri ? `url(${dataUri})` : "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {browsedImagesArray.length === 0 && <Text>Browse Image</Text>}

            <input
              multiple
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                handleMultipleImages(e);
              }}
              id="imageFile"
            />
          </label>
          <Flex
            flexDir="row"
            gap="1rem"
            borderRadius="5px"
            border="1px solid #e4e6ea"
            p="0.5rem"
            overflowX={browsedImagesArray.length > 3 ? "scroll" : "hidden"}
          >
            {browsedImagesArray.map((image, index) => (
              <Image
                border={selectedImage === image ? "3px solid #3ce2ad" : "none"}
                cursor="pointer"
                onClick={() => handleImageChange(index)}
                objectFit="cover"
                borderRadius="5px"
                height="5rem"
                width="5rem"
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Selected Image ${index}`}
                className="uploaded-image"
              />
            ))}
          </Flex>

          <Select
            value={language}
            onChange={handleSelectLanguage}
            cursor="pointer"
          >
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
            <option value="Bahasa">Bahasa</option>
          </Select>
          <Input
            type="text"
            placeholder="Describe your problem in short (optional)"
            value={symptomPrompt}
            onChange={(e) => setSymptomPrompt(e.target.value)}
          />
          {/* <Button onClick={handleUpload} isLoading={loading} loadingText="Detecting...">
            Submit
          </Button> */}

          <Button onClick={handleUpload} isLoading={loading} loadingText="Detecting..." backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
            color: `${theme.colors.button.hover_light_color}`,
            border: `${theme.colors.button.hover_light_border}`
          }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
        </Flex>

        <Flex width="60%">
          <Flex gap="1rem" flexDir="column" width="100%">
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Name of disease</Text>
              <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? (
                  "Detecting..."
                ) :
                  conditionsData[0]?.name
                }
              </Text>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Description</Text>
              <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? (
                  "Detecting..."
                ) :
                  conditionsData[0]?.description
                }
              </Text>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Communicable</Text>
              <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : conditionsData[0]?.communicable}
              </Text>

            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Symptoms</Text>
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : (<UnorderedList>
                  {conditionsData[0]?.symptoms?.map((symptom, index) => (
                    <ListItem key={index}>{symptom}</ListItem>
                  ))}
                </UnorderedList>)}
              </Flex>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Causes</Text>
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : (<UnorderedList>
                  {conditionsData[0]?.causes?.map((cause, index) => (
                    <ListItem key={index}>{cause}</ListItem>
                  ))}
                </UnorderedList>)}
              </Flex>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Treatment</Text>
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : (<UnorderedList>
                  {conditionsData[0]?.treatment?.map((treatment, index) => (
                    <ListItem key={index}>{treatment}</ListItem>
                  ))}
                </UnorderedList>)}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DermaDetection;
