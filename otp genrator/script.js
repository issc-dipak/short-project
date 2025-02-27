function GenerateOtp() {
    let otp = '';
    for (let i = 0; i < 4; i++) { // Fixed missing 'let' before 'i'
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

document.getElementById('btn').addEventListener('click', function () {
    let otp = GenerateOtp();
    document.querySelector('.otp').textContent = otp; // Fixed selector issue
});
