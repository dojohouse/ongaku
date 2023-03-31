import React, { useState } from 'react';
import { Tag } from '../../../models';
import { Input } from '../../common';
import { convertSpotifyLinkToURI } from '../../../utils/helpers';
import Popup from 'reactjs-popup';

interface AddNewPopupProps {
  newTag: Tag;
  openNewTag: boolean;
  // eslint-disable-next-line
  setOpenNewTag: any;
  // eslint-disable-next-line
  setNewTag: any;
  loading: boolean;
  // eslint-disable-next-line
  addNewTagHandler: any;
}

const AddNewPopup: React.FC<AddNewPopupProps> = (props: AddNewPopupProps) => {
  const {
    newTag,
    setNewTag,
    openNewTag,
    setOpenNewTag,
    addNewTagHandler,
    loading,
  } = props;
  

  const [spotifyLink, setSpotifyLink] = useState<string>("");

  const handleSpotifyURI = (value: string) => {
    setSpotifyLink(value);
    setNewTag({ ...newTag, musicId: convertSpotifyLinkToURI(value) })
  }

  return (
    <Popup
      open={openNewTag}
      closeOnDocumentClick
      modal
      onClose={() => setOpenNewTag(false)}
    >
      <div className="p-5 rounded-lg">
        <div>
          <h2>Add New Music Card</h2>
        </div>
        <div>
          <Input
            className="py-2"
            label="Title"
            placeholder="Oasis - Wonderwall"
            value={newTag.title}
            onChange={(event) =>
              setNewTag({ ...newTag, title: event.target.value })
            }
          />
          <Input
            className="py-2"
            label="Platform"
            placeholder="Spotify"
            value="spotify"
            disabled
          />
          <Input
            className="py-2"
            label="Music Link"
            value={spotifyLink}
            onChange={(event) => handleSpotifyURI(event.target.value)}
          />
          <div className="text-xxs">
            <mark className="bg-gray-200">
              Open Spotify → ••• (next to song/playlist) → Share → Copy Link
            </mark>
          </div>
          <Input
            className="py-2"
            label="Music Id"
            placeholder="spotify:track:1qPbGZqppFwLwcBC1JQ6Vr"
            value={newTag.musicId}
            onChange={(event) =>
              setNewTag({ ...newTag, musicId: event.target.value })
            }
          />
          <Input
            className="py-2"
            label="Tag Id (NFC UID)"
            placeholder="0x40x150x910x3a0x580x310x20"
            value={newTag.tagId}
            onChange={(event) =>
              setNewTag({ ...newTag, tagId: event.target.value })
            }
          />
        </div>
        <div className="pt-10 flex justify-end">
          <div>
            <button
              className="border-none py-1 px-2 mr-2"
              onClick={() => setOpenNewTag(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="border-2 border-green-300 bg-green-300 py-1 px-2 rounded"
              onClick={() => addNewTagHandler()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddNewPopup;
