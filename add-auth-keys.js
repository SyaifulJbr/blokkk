const fs = require('fs');
const path = require('path');

const authContextKeysToAdd = {
  en: {
    "LoginFailed": "Login failed",
    "LoginErrorOccurred": "An error occurred while logging in",
    "RegistrationFailed": "Registration failed",
    "RegistrationErrorOccurred": "An error occurred during registration",
    "OTPVerificationFailed": "OTP verification failed",
    "OTPVerificationErrorOccurred": "An error occurred while verifying OTP",
    "FailedToSendOTP": "Failed to send OTP",
    "FailedToSendOTPError": "An error occurred while sending OTP",
    "FailedToResetPassword": "Failed to reset password",
    "FailedToResetPasswordError": "An error occurred while resetting password"
  },
  id: {
    "LoginFailed": "Login gagal",
    "LoginErrorOccurred": "Terjadi kesalahan saat login",
    "RegistrationFailed": "Pendaftaran gagal",
    "RegistrationErrorOccurred": "Terjadi kesalahan saat pendaftaran",
    "OTPVerificationFailed": "Verifikasi OTP gagal",
    "OTPVerificationErrorOccurred": "Terjadi kesalahan saat verifikasi OTP",
    "FailedToSendOTP": "Gagal mengirim OTP",
    "FailedToSendOTPError": "Terjadi kesalahan saat mengirim OTP",
    "FailedToResetPassword": "Gagal mereset kata sandi",
    "FailedToResetPasswordError": "Terjadi kesalahan saat mereset kata sandi"
  },
  ar: {
    "LoginFailed": "فشل تسجيل الدخول",
    "LoginErrorOccurred": "حدث خطأ أثناء تسجيل الدخول",
    "RegistrationFailed": "فشل التسجيل",
    "RegistrationErrorOccurred": "حدث خطأ أثناء التسجيل",
    "OTPVerificationFailed": "فشل التحقق من OTP",
    "OTPVerificationErrorOccurred": "حدث خطأ أثناء التحقق من OTP",
    "FailedToSendOTP": "فشل إرسال OTP",
    "FailedToSendOTPError": "حدث خطأ أثناء إرسال OTP",
    "FailedToResetPassword": "فشل إعادة تعيين كلمة المرور",
    "FailedToResetPasswordError": "حدث خطأ أثناء إعادة تعيين كلمة المرور"
  },
  zh: {
    "LoginFailed": "登录失败",
    "LoginErrorOccurred": "登录时发生错误",
    "RegistrationFailed": "注册失败",
    "RegistrationErrorOccurred": "注册时发生错误",
    "OTPVerificationFailed": "OTP验证失败",
    "OTPVerificationErrorOccurred": "验证OTP时发生错误",
    "FailedToSendOTP": "发送OTP失败",
    "FailedToSendOTPError": "发送OTP时发生错误",
    "FailedToResetPassword": "重置密码失败",
    "FailedToResetPasswordError": "重置密码时发生错误"
  },
  ko: {
    "LoginFailed": "로그인 실패",
    "LoginErrorOccurred": "로그인 중 오류가 발생했습니다",
    "RegistrationFailed": "회원가입 실패",
    "RegistrationErrorOccurred": "회원가입 중 오류가 발생했습니다",
    "OTPVerificationFailed": "OTP 검증 실패",
    "OTPVerificationErrorOccurred": "OTP 검증 중 오류가 발생했습니다",
    "FailedToSendOTP": "OTP 전송 실패",
    "FailedToSendOTPError": "OTP 전송 중 오류가 발생했습니다",
    "FailedToResetPassword": "비밀번호 재설정 실패",
    "FailedToResetPasswordError": "비밀번호 재설정 중 오류가 발생했습니다"
  },
  pt: {
    "LoginFailed": "Falha no login",
    "LoginErrorOccurred": "Ocorreu um erro ao fazer login",
    "RegistrationFailed": "Falha no registro",
    "RegistrationErrorOccurred": "Ocorreu um erro durante o registro",
    "OTPVerificationFailed": "Falha na verificação de OTP",
    "OTPVerificationErrorOccurred": "Ocorreu um erro durante a verificação de OTP",
    "FailedToSendOTP": "Falha ao enviar OTP",
    "FailedToSendOTPError": "Ocorreu um erro ao enviar OTP",
    "FailedToResetPassword": "Falha ao redefinir senha",
    "FailedToResetPasswordError": "Ocorreu um erro ao redefinir senha"
  },
  ru: {
    "LoginFailed": "Не удалось войти",
    "LoginErrorOccurred": "Произошла ошибка при входе",
    "RegistrationFailed": "Регистрация не удалась",
    "RegistrationErrorOccurred": "Произошла ошибка при регистрации",
    "OTPVerificationFailed": "Не удалось проверить OTP",
    "OTPVerificationErrorOccurred": "Произошла ошибка при проверке OTP",
    "FailedToSendOTP": "Не удалось отправить OTP",
    "FailedToSendOTPError": "Произошла ошибка при отправке OTP",
    "FailedToResetPassword": "Не удалось сбросить пароль",
    "FailedToResetPasswordError": "Произошла ошибка при сбросе пароля"
  },
  tr: {
    "LoginFailed": "Giriş başarısız",
    "LoginErrorOccurred": "Giriş sırasında hata oluştu",
    "RegistrationFailed": "Kayıt başarısız",
    "RegistrationErrorOccurred": "Kayıt sırasında hata oluştu",
    "OTPVerificationFailed": "OTP doğrulaması başarısız",
    "OTPVerificationErrorOccurred": "OTP doğrulama sırasında hata oluştu",
    "FailedToSendOTP": "OTP gönderilemedi",
    "FailedToSendOTPError": "OTP gönderilirken hata oluştu",
    "FailedToResetPassword": "Şifre sıfırlama başarısız",
    "FailedToResetPasswordError": "Şifre sıfırlama sırasında hata oluştu"
  }
};

const languages = ['en', 'id', 'ar', 'zh', 'ko', 'pt', 'ru', 'tr'];

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    // Tambahkan keys baru
    Object.assign(json, authContextKeysToAdd[lang]);
    
    // Sort keys secara alfabetis
    const sortedJson = Object.keys(json).sort().reduce((acc, key) => {
      acc[key] = json[key];
      return acc;
    }, {});
    
    fs.writeFileSync(filePath, JSON.stringify(sortedJson, null, 2), 'utf8');
    console.log(`✅ ${lang}.json updated with AuthContext keys`);
  } catch (err) {
    console.error(`❌ Error updating ${lang}.json:`, err.message);
  }
});

console.log('\n✅ All language files updated with AuthContext keys successfully!');
