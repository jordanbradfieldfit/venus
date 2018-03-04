const filterRemoteAddress = (address) => {
    return address.indexOf(":") !== -1 ? address.split(":")[address.split(":").length - 1] : address;
}

module.exports = {
    filterRemoteAddress
}