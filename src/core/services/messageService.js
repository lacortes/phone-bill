const messageService = () => {

    let message = '';

    const set = (msg) => {
        message = msg;
    };

    const get = () => {
        return message;
    };

    const reset = () => {
        message = '';
    };

    return Object.freeze({
        set,
        get,
        reset
    });
};

export default messageService();