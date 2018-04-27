export const ChannelItem = ({href, value, clickChannel, clickChannelIndex}) => {
    return (
        <a href={href}
           name={value}
           onClick={() => clickChannel(clickChannelIndex)}
        >
            {value + Number(1)}
        </a>
    );
};