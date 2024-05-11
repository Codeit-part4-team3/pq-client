import styled from 'styled-components';

import MediaControlPanel from './_components/MediaControlPanel';
import LocalMedia from './_components/LocalMedia';
import RemoteMedia from './_components/RemoteMedia';
import MeetingNote from './_components/MeetingNote';
import useVoiceChannel from './_hook/VoiceChannel.hook';

export default function VoiceChannel() {
  const {
    users,
    localMediaData,
    isMutedLocalStream,
    showLocalVideo,
    isMutedAllRemoteStreams,
    showMeetingNote,
    handleMuteLocalStream,
    handleOffLocalCamera,
    handleMuteAllRemoteStreams,
  } = useVoiceChannel();

  return (
    <Wrapper>
      <ContentBox>
        <MediaBox>
          <VideoContainer>
            <LocalMedia {...localMediaData} />
            {users.map((user) => (
              <RemoteMedia key={user.socketId} {...user} isMutedAllRemoteStreams={isMutedAllRemoteStreams} />
            ))}
          </VideoContainer>
          <MediaControlPanel
            onMuteLocalStreamButtonClick={handleMuteLocalStream}
            isMutedLocalStream={isMutedLocalStream}
            onOffLocalCameraButtonClick={handleOffLocalCamera}
            showLocalVideo={showLocalVideo}
            onHandleMuteAllRemoteStreamsButtonClick={handleMuteAllRemoteStreams}
            isMutedAllRemoteStreams={isMutedAllRemoteStreams}
          />
        </MediaBox>
        {showMeetingNote ? <MeetingNote /> : null}
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--landing_background_color);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const VideoContainer = styled.div`
  width: 100%;

  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-template-rows: repeat(2, minmax(120px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 10px;
`;

const ContentBox = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

const MediaBox = styled.div`
  width: 65%;
  height: 100%;
  min-width: 450px;

  display: flex;
  flex-direction: column;
`;
