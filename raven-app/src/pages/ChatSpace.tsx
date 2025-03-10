import { ChannelSpace } from "@/components/feature/chat/chat-space/ChannelSpace"
import { DirectMessageSpace } from "@/components/feature/chat/chat-space/DirectMessageSpace"
import { AlertBanner, ErrorBanner } from "@/components/layout/AlertBanner"
import { FullPageLoader } from "@/components/layout/Loaders"
import { useCurrentChannelData } from "@/hooks/useCurrentChannelData"
import { ChannelMembersProvider } from "@/utils/channel/ChannelMembersProvider"
import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FrappeError, useSWRConfig } from "frappe-react-sdk"

export const ChatSpace = () => {

    // only if channelID is present render ChatSpaceArea component'
    const { channelID } = useParams<{ channelID: string }>()

    if (channelID) {
        return <ChatSpaceArea channelID={channelID} />
    }

    return <Box p={2}><AlertBanner status="error" heading="No channel found" /></Box>

}

const ChatSpaceArea = ({ channelID }: { channelID: string }) => {

    const { channel, error, isLoading } = useCurrentChannelData(channelID)
    const { mutate, cache } = useSWRConfig()

    useEffect(() => {
        //If the cached value of unread message count is 0, then no need to update it
        const channels = cache.get('unread_channel_count')?.data?.message?.channels
        if (channels) {
            const cached_channel = channels.find((channel: any) => channel.name === channelID)
            if (cached_channel && cached_channel.unread_count === 0) {
            } else {
                mutate('unread_channel_count')
            }
        } else {
            mutate('unread_channel_count')
        }
    }, [channelID])

    if (isLoading) {
        <FullPageLoader />
    }

    if (error) {
        return <Box p={2}><ErrorBanner error={error} /></Box>
    }

    if (channel) {
        // depending on channel type render ChannelSpace or DirectMessageSpace
        return (
            <ChannelMembersProvider channelID={channelID}>
                {channel.type === "dm" ?
                    <DirectMessageSpace channelData={channel.channelData} />
                    : <ChannelSpace channelData={channel.channelData} />
                }
            </ChannelMembersProvider>
        )
    }

    return <Box p={2}><ErrorBanner error={
        {
            message: "No channel found",
            exception: `Channel ${channelID} not found`

        } as FrappeError
    } /></Box>
}