export const ChannelItem = ({href, value}) => {
    return (
        <a href={href}
           name={value}
        >
            {value + Number(1)}
        </a>
    );
};