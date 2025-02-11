import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { List, Input, Button, Typography, Divider, Spin, Space } from "antd";
import { CommentOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Text } = Typography;
// Mock API call to simulate fetching comments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchComments = async (bookId) => {
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
export const CommentSection = ({ bookId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    // Fetch comments when the component mounts
    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchComments(bookId);
                setComments(data);
            }
            catch (error) {
                console.error("Failed to fetch comments:", error);
            }
            finally {
                setLoading(false);
            }
        };
        loadComments();
    }, [bookId]);
    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: comments.length + 1,
                user: "You", // Simulating user
                content: newComment,
                timestamp: "Just now",
            };
            setComments([...comments, newCommentObj]);
            setNewComment("");
        }
    };
    return (_jsx("div", { children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs(Typography.Title, { level: 4, style: { color: "black" }, children: [_jsx(CommentOutlined, {}), " B\u00ECnh lu\u1EADn"] }), loading ? (_jsx(Spin, { tip: "Loading comments...", children: _jsx("div", { style: { minHeight: "100px" } }) })) : (_jsxs(_Fragment, { children: [_jsx(List, { dataSource: comments, header: `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`, itemLayout: "horizontal", renderItem: (comment) => (_jsxs(_Fragment, { children: [_jsx(List.Item, { children: _jsx(List.Item.Meta, { title: _jsx(Text, { strong: true, style: { color: "black" }, children: comment.user }), description: _jsxs(Text, { style: { color: "black" }, children: [comment.content, _jsx("br", {}), _jsx(Text, { type: "secondary", style: { fontSize: "12px" }, children: comment.timestamp })] }) }) }), _jsx(Divider, { style: { margin: "0" } })] })) }), _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(TextArea, { rows: 3, value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: "Vi\u1EBFt b\u00ECnh lu\u1EADn...", style: { borderColor: "#d9d9d9", color: "black" } }), _jsx(Button, { type: "primary", onClick: handleAddComment, style: { backgroundColor: "black", borderColor: "black" }, children: "G\u1EEDi" })] })] }))] }) }));
};
