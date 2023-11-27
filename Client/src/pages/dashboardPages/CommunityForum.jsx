import { Flex, Button, useToast, Input, Modal, ModalContent, ModalOverlay, ModalBody, ModalCloseButton, useDisclosure, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// import 'draft-js/dist/Draft.css'; 
import axios from 'axios';
import RenderedContent from '../../components/RenderedContent';
const CommunityForum = () => {
    const toast = useToast();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogPosts, setBlogPosts] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogBannerImage, setBlogBannerImage] = useState('');
    const { isOpen: checkIsOpenModal, onOpen: openModal, onClose: closeModal } = useDisclosure()

    const [viewBlogPostObject, setViewBlogPostObject] = useState({
        title: blogTitle,
        author: blogAuthor,
        bannerImage: blogBannerImage,
        content: [],
    });

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleStyleClick = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const handleSaveClick = async () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = JSON.stringify(convertToRaw(contentState));
        // console.log(rawContentState); 

        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/postCommunityForum`, {
                content: rawContentState,
                title: blogTitle,
                author: blogAuthor,
                bannerImage: blogBannerImage,
            });
            if (res.status === 200) {
                toast({
                    title: 'Saved successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setBlogAuthor('');
                setBlogTitle('');
                setBlogBannerImage('');
                setEditorState(EditorState.createEmpty());

            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to load content from backend, assuming you have a rawContentState
    const loadContentFromBackend = (rawContentState) => {
        try {
            const contentState = convertFromRaw(JSON.parse(rawContentState));
            const plainText = contentState.getPlainText();
            setEditorState(EditorState.createWithContent(plainText));
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };



    useEffect(() => {
        // Fetch blog posts when the component mounts
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getCommunityForum`);
                setBlogPosts(response.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchBlogPosts();
    }, []);

    console.log("Blog Posts =>", blogPosts);

    const viewSinglePost = (id) => {
        const post = blogPosts.find((post) => post._id === id);

        // load the post in viewBlogPostObject
        const contentState = convertFromRaw(JSON.parse(post?.content));
        const blocks = contentState.getBlocksAsArray();
        setViewBlogPostObject({
            title: post.title,
            author: post.author,
            bannerImage: post.bannerImage,
            content: blocks,
        });

        openModal();
    };

    console.log("ViewBlogPostObject =>", viewBlogPostObject);

    return (
        <Flex p="2rem" alignItems="flex-start" justifyContent="center" margin="auto" maxH="100vh">
            <Modal isOpen={checkIsOpenModal} onClose={closeModal} isCentered size="4xl">
                <ModalOverlay />
                <ModalContent width="100%" maxH="80vh" overflowY="scroll">
                    <ModalCloseButton />
                    <ModalBody width="100%">
                        <Flex flexDir="column" alignItems="center" justifyContent="center" width="100%" borderRadius="5px" p="1rem">
                            <Flex flexDir="column" alignItems="flex-start" justifyContent="flex-start" width="100%">
                                <Text>{viewBlogPostObject?.title}</Text>
                                <Text>{viewBlogPostObject?.author}</Text>
                                <Image src={viewBlogPostObject?.bannerImage} h={60} />
                                <div>
                                    {viewBlogPostObject?.content.map((block, index) => {
                                        const text = block.getText();
                                        const isBold = block.getInlineStyleAt(0).has('BOLD'); // Check if the first character is bold
                                        const isEmpty = text.trim() === '';

                                        return (
                                            <div key={index} style={{ fontWeight: isBold ? 'bold' : 'normal', whiteSpace: 'pre-wrap', fontStyle: isEmpty ? 'italic' : 'normal', }}>
                                                {text}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Flex flexDir="row" h="90vh" width="1200px" alignItems="center" justifyContent="center" gap="1rem">
                <Flex width="40%" flexDir="column" alignItems="center" borderRight="1px solid #333" pr="1rem" gap="1rem" maxH="100vh" h="90vh" overflowY="scroll">

                    {blogPosts.map((post) => (
                        <Flex key={post._id} flexDir="column" alignItems="flex-start" justifyContent="flex-start" width="100%" border="1px solid #333" borderRadius="5px" p="1rem">
                            <Flex flexDir="column" alignItems="flex-start" justifyContent="flex-start" width="100%">
                                <RenderedContent key={post._id} rawContentState={post.content} author={post?.author} />
                                <Button onClick={() => viewSinglePost(post._id)}>View</Button>

                            </Flex>
                        </Flex>
                    ))}

                </Flex>
                <Flex flexDir="column" color="#333" width="100%" maxH="100vh" h="90vh" overflowY="scroll" alignItems="flex-start" justifyContent="flex-start" p="0 1rem">
                    <Flex justifyContent="space-between" w="100%">
                        <Flex gap="1rem">
                            <Button onClick={() => handleStyleClick('BOLD')}>Bold</Button>
                            <Button onClick={() => handleStyleClick('ITALIC')}>Italic</Button>
                        </Flex>
                        <Flex>
                            <Button onClick={handleSaveClick}>Post</Button>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" gap="1rem" m="1rem 0" w="100%">
                        <Input value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} placeholder='Author name' />
                        <Input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder='Write your blog title' />
                        <Input value={blogBannerImage} onChange={(e) => setBlogBannerImage(e.target.value)} placeholder="Give a banner image url starting with ' https:// ' " />
                    </Flex>

                    <Flex border="1px solid #333" p="0.5rem 1rem" borderRadius="5px" width="100%" height="100%" overflowY="scroll">
                        <Editor
                            editorState={editorState}
                            onChange={handleEditorChange}
                            placeholder="Start typing...                                                                                                                                                                                                                                                         "
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CommunityForum;
