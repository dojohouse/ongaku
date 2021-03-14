import React, { useState, useEffect } from 'react';
import { Tag } from '../../../models';
import { getTags, postTag, patchTag, deleteTag } from '../../../utils/api';
import { TagCard, EmptyTagCard } from '../../common';
import { defaultTag } from '../../../utils/helpers';
import AddNewPopup from './AddNewPopup';
import ModifyPopup from './ModifyPopup';
import 'reactjs-popup/dist/index.css';

const Home: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [openNewTag, setOpenNewTag] = useState<boolean>(false);
  const [openModifyTag, setOpenModifyTag] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<Tag>(defaultTag);
  const [modifyTag, setModifyTag] = useState<Tag>(defaultTag);
  const [colors] = useState([
    'red',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        const response = await getTags();
        setTags(response);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const getColor = (index: number): string => {
    return colors[index % colors.length];
  };

  const addNewTagHandler = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await postTag(newTag);
      setTags((tags) => [...tags, response]);
      setLoading(false);
      setOpenNewTag(false);
      setNewTag(defaultTag);
    } catch (error) {
      console.log(error);
    }
  };

  const modifyTagHandler = async (modifyTag: Tag): Promise<void> => {
    try {
      setLoading(true);
      const response = await patchTag(modifyTag);
      const updatedTags = tags.map((tag) =>
        tag.tagId === response.tagId ? response : tag,
      );
      setTags(updatedTags);
      setLoading(false);
      setOpenModifyTag(false);
      setModifyTag(defaultTag);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTagHandler = async (removeTag: Tag): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteTag(removeTag);
      setTags(response);
      setLoading(false);
      setOpenModifyTag(false);
      setModifyTag(defaultTag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:container mx-20 my-20">
      <div className="pl-2 py-5 mx-20 mb-10">
        <h1>Ongaku Admin</h1>
      </div>
      <div className="mx-20 flex flex-wrap">
        <EmptyTagCard onClick={() => setOpenNewTag(true)} />
        {tags.map((tag, index) => (
          <TagCard
            onClick={() => [setOpenModifyTag(true), setModifyTag(tag)]}
            key={index}
            tag={tag}
            color={getColor(index)}
          />
        ))}
      </div>
      <AddNewPopup
        newTag={newTag}
        openNewTag={openNewTag}
        setOpenNewTag={setOpenNewTag}
        setNewTag={setNewTag}
        loading={loading}
        addNewTagHandler={addNewTagHandler}
      />
      {modifyTag && (
        <ModifyPopup
          modifyTag={modifyTag}
          openModifyTag={openModifyTag}
          setOpenModifyTag={setOpenModifyTag}
          setModifyTag={setModifyTag}
          loading={loading}
          deleteTagHandler={deleteTagHandler}
          modifyTagHandler={modifyTagHandler}
        />
      )}
    </div>
  );
};

export default Home;
