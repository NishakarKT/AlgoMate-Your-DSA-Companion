let otps = [];

export const generate = email => {
    const myOtp = Math.floor(100000 + Math.random() * 900000);
    otps = otps.filter(otp => !otp.includes(email));
    otps.push(email + myOtp);
    setTimeout(() => { otps = otps.filter(otp => otp !== email + myOtp) }, 60000);
    return myOtp;
};

export const verify = (email, myOtp) => {
    const match = otps.find(otp => otp === email + myOtp);
    otps = otps.filter(otp => otp !== match);
    if (match) return true;
    else return false;
};