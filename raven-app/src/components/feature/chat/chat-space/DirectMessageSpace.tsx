import { DMChannelListItem } from "@/utils/channel/ChannelListProvider"
import { Box } from "@chakra-ui/react"
import { DMChannelHeader } from "../../chat-header/DMChannelHeader"
import { ChatBoxBody } from "../chat-history/ChatBoxBody"
import { useContext } from "react"
import { ChannelMembersContext, ChannelMembersContextType } from "@/utils/channel/ChannelMembersProvider"

interface DirectMessageSpaceProps {
    channelData: DMChannelListItem
}

export const DirectMessageSpace = ({ channelData }: DirectMessageSpaceProps) => {

    const { channelMembers } = useContext(ChannelMembersContext) as ChannelMembersContextType

    return (
        <Box>
            <DMChannelHeader
                channelData={channelData}
                channelMembers={channelMembers} />
            <ChatBoxBody channelData={channelData} />
        </Box>
    )
}