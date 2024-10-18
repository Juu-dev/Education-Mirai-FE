import { useEffect, useState } from "react";
import { List, Input, Button, Typography, Divider, Spin, Space } from "antd";
import { CommentOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

// Comment interface
interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

// Mock API call to simulate fetching comments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchComments = async (bookId: string): Promise<Comment[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, user: "Alice", content: "Great book! Highly recommend it.", timestamp: "2 hours ago" },
                { id: 2, user: "Bob", content: "Loved the story and characters.", timestamp: "1 day ago" },
                { id: 3, user: "Charlie", content: "A bit slow at the start, but worth it.", timestamp: "3 days ago" },
            ]);
        }, 1000); // Simulate network delay of 1 second
    });
};

interface CommentSectionProps {
    bookId: string;
}

export const CommentSection = ({ bookId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch comments when the component mounts
    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchComments(bookId);
                setComments(data);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            } finally {
                setLoading(false);
            }
        };
        loadComments();
    }, [bookId]);

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj: Comment = {
                id: comments.length + 1,
                user: "You", // Simulating user
                content: newComment,
                timestamp: "Just now",
            };
            setComments([...comments, newCommentObj]);
            setNewComment("");
        }
    };

    return (
        <div>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Title level={4} style={{ color: "black" }}>
                    <CommentOutlined /> Bình luận
                </Typography.Title>

                {/* Loading State */}
                {loading ? (
                    <Spin tip="Loading comments...">
                        <div style={{ minHeight: "100px" }}></div>
                    </Spin>
                ) : (
                    <>
                        {/* Render Comments */}
                        <List
                            dataSource={comments}
                            header={`${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
                            itemLayout="horizontal"
                            renderItem={(comment) => (
                                <>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={
                                                <Text strong style={{ color: "black" }}>
                                                    {comment.user}
                                                </Text>
                                            }
                                            description={
                                                <Text style={{ color: "black" }}>
                                                    {comment.content}
                                                    <br />
                                                    <Text type="secondary" style={{ fontSize: "12px" }}>
                                                        {comment.timestamp}
                                                    </Text>
                                                </Text>
                                            }
                                        />
                                    </List.Item>
                                    <Divider style={{ margin: "0" }} />
                                </>
                            )}
                        />

                        {/* Add Comment Section */}
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <TextArea
                                rows={3}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Viết bình luận..."
                                style={{ borderColor: "#d9d9d9", color: "black" }}
                            />
                            <Button
                                type="primary"
                                onClick={handleAddComment}
                                style={{ backgroundColor: "black", borderColor: "black" }}
                            >
                                Gửi
                            </Button>
                        </Space>
                    </>
                )}
            </Space>
        </div>
    );
};
