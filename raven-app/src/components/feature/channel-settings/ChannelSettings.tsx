import { Box, Stack, useColorMode, Divider } from "@chakra-ui/react"
import { ChannelListItem } from "@/utils/channel/ChannelListProvider"
import { ArchiveChannelButton } from "./archive-channel/ArchiveChannelButton"
import { ChangeChannelTypeButton } from "./change-channel-type/ChangeChannelTypeButton"
import { DeleteChannelButton } from "./delete-channel/DeleteChannelButton"

type Props = {
    onClose: () => void
    channelData: ChannelListItem
}

export const ChannelSettings = ({ onClose, channelData }: Props) => {

    const { colorMode } = useColorMode()

    const BOXSTYLE = {
        p: '0',
        rounded: 'md',
        border: '1px solid',
        borderColor: colorMode === 'light' ? 'gray.200' : 'gray.600'
    }

    const BUTTONSTYLE = {
        variant: 'link',
        size: 'sm',
        p: '4',
        justifyContent: 'flex-start',
        _hover: {
            bg: colorMode === 'light' ? 'gray.50' : 'gray.800'
        },
        rounded: 'none'
    }

    return (
        <Stack spacing='4'>
            <Box {...BOXSTYLE}>
                <Stack spacing='0'>
                    <ChangeChannelTypeButton styles={BUTTONSTYLE} channelData={channelData} />
                    <Divider />
                    <ArchiveChannelButton styles={BUTTONSTYLE} onClose={onClose} channelData={channelData} />
                    <Divider />
                    <DeleteChannelButton styles={BUTTONSTYLE} onClose={onClose} channelData={channelData} />
                </Stack>
            </Box>
        </Stack>
    )
}