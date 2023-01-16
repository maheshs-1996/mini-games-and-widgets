import { useEffect, useState } from "react";
import directoryData from "./data";
import "./folder.css";

const images = {
    folder: "https://cdn-icons-png.flaticon.com/512/3767/3767084.png",
    file: "https://www.shutterstock.com/image-vector/document-icon-page-file-260nw-1162806445.jpg",
};

const getImage = (type) => images[type];

const Directory = () => {
    const [data, setData] = useState(directoryData);

    const updateDirectory = (
        id,
        contentObj,
        current = data,
        originalState = data
    ) => {
        for (let i = 0; i < current.length; i++) {
            if (current[i].id == id) {
                current[i].contents.push(contentObj);
                setData([...originalState]);
                return;
            } else if (current[i].contents.length) {
                updateDirectory(
                    id,
                    contentObj,
                    current[i].contents,
                    originalState
                );
            }
        }
    };

    return (
        <div className="directory">
            {data.map((folder, index) => {
                return (
                    <Folder
                        key={folder.id}
                        folder={folder}
                        updateDirectory={updateDirectory}
                    />
                );
            })}
        </div>
    );
};

const Folder = ({ folder, updateDirectory }) => {
    const { type, name, id, contents = [] } = folder;
    const [expand, setExpandFlag] = useState(false);
    const [addContentProps, setAddContentProps] = useState({});

    const isFolder = type === "folder";

    const addContent = (e, type) => {
        setExpandFlag(true);
        e.stopPropagation();
        setAddContentProps({
            show: true,
            type,
        });
    };

    useEffect(() => {
        return () => setAddContentProps({});
    }, []);

    const addNewContent = (e) => {
        e.preventDefault();
        const newContent = {
            id: new Date().getTime().toString(36),
            name: addContentProps.name,
            type: addContentProps.type,
            contents: [],
        };
        updateDirectory(id, newContent);
        setAddContentProps({});
        setExpandFlag(true);
    };

    return (
        <>
            <div
                className={`folder ${contents.length ? `files_present` : ``}`}
                onClick={() => setExpandFlag((f) => !f)}
            >
                <img className="folder_img" src={getImage(type)} alt="folder" />
                <span>{name}</span>
                {isFolder && (
                    <div className="cta_container">
                        <button onClick={(e) => addContent(e, "folder")}>
                            Folder +
                        </button>
                        <button onClick={(e) => addContent(e, "file")}>
                            File +
                        </button>
                    </div>
                )}
            </div>
            {addContentProps.show ? (
                <form onSubmit={addNewContent} className="addContent">
                    <img
                        className="folder_img"
                        src={getImage(addContentProps.type)}
                        alt="add_content"
                    />
                    <input
                        type="text"
                        value={addContentProps.name || ""}
                        required
                        placeholder="Enter Name.."
                        onBlur={() => setAddContentProps({})}
                        onChange={(e) => {
                            setAddContentProps((prev) => ({
                                show: true,
                                type: prev.type,
                                name: e.target.value,
                            }));
                        }}
                        autoFocus
                    />
                    <button type="submit">Add</button>
                </form>
            ) : null}
            {expand && isFolder && folder.contents.length ? (
                <div className="contents">
                    {folder.contents.map((content) => {
                        return (
                            <Folder
                                key={content.id}
                                folder={content}
                                updateDirectory={updateDirectory}
                            />
                        );
                    })}
                </div>
            ) : null}
        </>
    );
};

export default Directory;
