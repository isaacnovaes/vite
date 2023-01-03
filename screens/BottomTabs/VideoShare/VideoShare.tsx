import AgoraUIKit, {
    Settings,
    rtcCallbacks as RTCCallbacks,
    ConnectionData,
    DualStreamMode,
} from 'agora-rn-uikit';
import { useContext, useState } from 'react';
import { appId, rtcToken } from '../../../Constants/video';
import { colors } from '../../../Constants/colors';
import { Context } from '../../../context/ContextProvider';

const remoteBtnStyle = {
    backgroundColor: colors.green,
    borderColor: colors.green,
};

const VideoShare = () => {
    const [videoCall, setVideoCall] = useState(true);
    const {
        state: { user },
    } = useContext(Context);

    if (!user) {
        return null;
    }

    const connectionData: ConnectionData = {
        appId,
        rtcToken,
        channel: user.roomId,
    };
    const rtcCallbacks: RTCCallbacks = {
        EndCall: () => setVideoCall(false),
    };

    const settings: Settings = {
        initialDualStreamMode: DualStreamMode.DYNAMIC,
    };

    return videoCall ? (
        <AgoraUIKit
            connectionData={connectionData}
            rtcCallbacks={rtcCallbacks}
            settings={settings}
            styleProps={{
                localBtnStyles: {
                    muteLocalVideo: remoteBtnStyle,
                    muteLocalAudio: remoteBtnStyle,
                    switchCamera: remoteBtnStyle,
                },
                minViewContainer: {
                    top: 0,
                    backgroundColor: colors.background,
                    borderColor: '#2edb85',
                    borderWidth: 2,
                    height: '28%',
                },
                minViewStyles: {
                    height: '100%',
                },
                localBtnContainer: {
                    backgroundColor: colors.background,
                    bottom: 0,
                    paddingVertical: 10,
                    borderWidth: 2,
                    borderColor: '#2edb85',
                    height: 80,
                },
            }}
        />
    ) : null;
};

export default VideoShare;
