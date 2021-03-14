import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Tag } from './models';
import { getTags, postTag, patchTag } from './utils/api';
import { TagCard, EmptyTagCard, Input } from './components';
import { defaultTag } from './utils/helpers';
import 'reactjs-popup/dist/index.css';


function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [openNewTag, setOpenNewTag] = useState<boolean>(false);
  const [openModifyTag, setOpenModifyTag] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<Tag>(defaultTag);
  const [modifyTag, setModifyTag] = useState<Tag>(defaultTag);
  const [colors] = useState(["red", "yellow", "green", "blue", "indigo", "purple", "pink"])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        const response = await getTags();
        setTags(response)
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);


  const getColor = (index: number): string => {
    return colors[index % colors.length];
  }

  const addNewTagHandler = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await postTag(newTag);
      setTags(tags => [...tags, response])
      setLoading(false);
      setOpenNewTag(false);
      setNewTag(defaultTag)
    } catch (error) {
      console.log(error);
    }
  }

  const modifyTagHandler = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await patchTag(modifyTag);
      const updatedTags = tags.map(tag => (tag.tagId === response.tagId) ? response : tag)
      setTags(updatedTags)
      setLoading(false);
      setOpenModifyTag(false);
      setModifyTag(defaultTag)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="lg:container mx-20 my-20">
      <div className="pl-2 py-5 mx-20 mb-10">
        <h1>Ongaku Admin</h1>
      </div>
      <div className="mx-20 flex flex-wrap">
        <EmptyTagCard onClick={() => setOpenNewTag(true)} />
        {tags.map((tag, index) =>
          <TagCard onClick={() => [setOpenModifyTag(true), setModifyTag(tag)]} key={index} tag={tag} color={getColor(index)} />
        )}
      </div>
      <Popup open={openNewTag} closeOnDocumentClick modal onClose={() => setOpenNewTag(false)}>
        <div className="p-5 rounded-lg">
          <div>
            <h2>Add new Tag</h2>
          </div>
          <div>
            <Input
              className="py-2"
              label="Title"
              placeholder="Oasis - Wonderwall"
              value={newTag.title}
              onChange={(event) => setNewTag({ ...newTag, title: event.target.value })}
            />
            <Input
              className="py-2"
              label="Music Id"
              placeholder="spotify:track:1qPbGZqppFwLwcBC1JQ6Vr"
              value={newTag.musicId}
              onChange={(event) => setNewTag({ ...newTag, musicId: event.target.value })}
            />
            <Input
              className="py-2"
              label="Tag Id (optional)"
              placeholder="6f60fd52-2799-4e3a-9d4b-d270ea1a2357"
              value={newTag.tagId}
              onChange={(event) => setNewTag({ ...newTag, tagId: event.target.value })}
            />
            <Input className="py-2" label="Platform" placeholder="Spotify" value="spotify" disabled />
          </div>
          <div className="pt-10 flex justify-end">
            <div>
              <button className="border-none py-1 px-2 mr-2" onClick={() => setOpenNewTag(false)} disabled={loading}>Cancel</button>
            </div>
            <div>
              <button className="border-2 border-green-300 bg-green-300 py-1 px-2 rounded" onClick={() => addNewTagHandler()}>Save</button>
            </div>
          </div>
        </div>
      </Popup>
      {
        modifyTag &&
        <Popup open={openModifyTag} closeOnDocumentClick modal onClose={() => setOpenModifyTag(false)}>
          <div className="p-5 rounded-lg">
            <div>
              <h2>Modify Tag</h2>
            </div>
            <div>
              <Input
                className="py-2"
                label="Title"
                value={modifyTag.title}
                onChange={(event) => setModifyTag({ ...modifyTag, title: event.target.value })}
              />
              <Input
                className="py-2"
                label="Music Id"
                value={modifyTag.musicId}
                onChange={(event) => setModifyTag({ ...modifyTag, musicId: event.target.value })}
              />
              <Input
                className="py-2"
                label="Tag Id"
                value={modifyTag.tagId}
                disabled
              />
              <Input className="py-2" label="Platform" placeholder="Spotify" value="spotify" disabled />
            </div>
            <div className="pt-10 flex justify-end">
              <div>
                <button className="border-none py-1 px-2 mr-2" onClick={() => setOpenModifyTag(false)} disabled={loading}>Cancel</button>
              </div>
              <div>
                <button className="border-2 border-green-300 bg-green-300 py-1 px-2 rounded" onClick={() => modifyTagHandler()}>Save</button>
              </div>
            </div>
          </div>
        </Popup>
      }
    </div>
  );
}

export default App;
