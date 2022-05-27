import React, { useContext } from "react";
import "./PostDrawer.css";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// consts
const tagURLs = { LeetCode: "https://leetcode.com/problemset/all/?page=1&topicSlugs=", Codechef: "https://www.codechef.com/practice?page=0&limit=100&sort_by=difficulty_rating&sort_order=asc&search=&start_rating=0&end_rating=5001&topic=&group=all&tags=", Codeforces: "https://codeforces.com/problemset?tags=" };

const PostDrawer = ({ post, setPost, style }) => {
    const { dark } = useContext(UserContext);

    return (
        post ? <div className={`postDrawer ${dark ? "postDrawer__dark" : ""}`} style={style}>
            {post.fileURLs ? <MediaSlider mediaFiles={post.fileURLs} isCarousel={post.isQuestion} /> : null}
            <div className="postDrawer__content">
                <CancelRoundedIcon className="postDrawer__closeBtn" onClick={() => setPost(null)} />
                {post.date ? <p className="postDrawer__date">{post.date}</p> : null}
                {post.title ? <p className="postDrawer__title">{post.title} {post.rating ? <sup className="postDrawer__host" style={{ color: "teal", fontWeight: "bold" }}>{post.rating}</sup> : null}</p> : <p style={{ marginBottom: "5px" }}><span className="postDrawer__title" style={{ marginBottom: "0" }}>LeetCode's Question</span><br /><br />Follow the url to access the question: <span className="postDrawer__link" onClick={() => window.open(post.url)}>{post.url}</span></p>}
                {post.category ? <p className="postDrawer__category">{post.category}</p> : null}
                {post.description ? <pre className="postDrawer__description">{post.description}</pre> : null}
                <hr />
                {post.host ? <p className="postDrawer__host" style={{ marginTop: "5px" }}>{post.host}</p> : null}
                {post.input_format?.length ? <p className="postDrawer__sectionTitle">Input Format</p> : null}
                {post.input_format?.length ? post.input_format.map((input_format, index) => <div key={"postDrawer__samples_" + index}>
                    <p className="postDrawer__sampleInput">{input_format}</p>
                </div>) : null}
                {post.input_format?.length ? <hr /> : null}
                {post.output_format?.length ? <p className="postDrawer__sectionTitle">Output Format</p> : null}
                {post.output_format?.length ? post.output_format.map((output_format, index) => <div key={"postDrawer__samples_" + index}>
                    <p className="postDrawer__sampleInput">{output_format}</p>
                </div>) : null}
                {post.output_format?.length ? <hr /> : null}
                {post.time_limit ? <p className="postDrawer__sectionTitle">Time Limit: <span style={{ color: "rgb(100,100,100)" }}>{post.time_limit}</span></p> : null}
                {post.time_limit ? <hr /> : null}
                {post.memory_limit ? <p className="postDrawer__sectionTitle">Memory Limit: <span style={{ color: "rgb(100,100,100)" }}>{post.memory_limit}</span></p> : null}
                {post.memory_limit ? <hr /> : null}
                {post.sample_inputs?.length ? post.sample_inputs.map((sample_input, index) => <div key={"postDrawer__samples_" + index}>
                    <p className="postDrawer__sectionTitle">Sample Input {index + 1}</p>
                    <pre className="postDrawer__sampleInput">{sample_input.startsWith("y\n") ? sample_input.slice(2) : sample_input}</pre>
                    <p className="postDrawer__sectionTitle">Sample Output {index + 1}</p>
                    <pre className="postDrawer__sampleOutput">{post.sample_outputs[index].startsWith("y\n") ? post.sample_outputs[index].slice(2) : post.sample_outputs[index]}</pre>
                    <hr />
                </div>) : null}
                {post.tags?.length ? <div className="postDrawer__tags">
                    {post.tags?.length ? <b>Tags:</b> : null}
                    {post.tags?.length ? post.tags.map((tag, index) => tag.split(", ").map((t, i) => <p key={"postDrawer__tags_" + i} className="postDrawer__tag" onClick={() => window.open(tagURLs[post.platform] + t.toLowerCase().replace(" ", post.platform === "Codeforces" ? "+" : "-"))}>{t}</p>)) : null}
                </div> : null}
                {post.tags?.length ? <hr /> : null}
                {post.platform ? <p className="postDrawer__host" style={{ marginTop: "10px" }}>Platform: {post.platform}</p> : null}
            </div>
        </div> : <></>
    );
};

export default PostDrawer;
