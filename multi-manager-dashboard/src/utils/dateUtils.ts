
export const formatDate = (timestampInSeconds: number) => {
    const date = new Date(timestampInSeconds * 1000);

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().substr(-2);
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hour}:${minute}`;
}