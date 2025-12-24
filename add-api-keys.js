const fs = require('fs');
const path = require('path');

const apiKeysToAdd = {
  en: {
    "NoOTPFound": "No OTP found. Please request a new OTP.",
    "OTPExpired": "OTP has expired. Please request a new OTP.",
    "OTPInvalid": "OTP is invalid.",
    "PasswordChangedPleaseLogin": "Password changed successfully. Please login with new password."
  },
  id: {
    "NoOTPFound": "OTP tidak ditemukan. Silakan minta OTP baru.",
    "OTPExpired": "OTP telah kadaluarsa. Silakan minta OTP baru.",
    "OTPInvalid": "OTP tidak valid.",
    "PasswordChangedPleaseLogin": "Kata sandi berhasil diubah. Silakan login dengan kata sandi baru."
  },
  ar: {
    "NoOTPFound": "لم يتم العثور على OTP. يرجى طلب OTP جديد.",
    "OTPExpired": "انتهت صالحة OTP. يرجى طلب OTP جديد.",
    "OTPInvalid": "OTP غير صالح.",
    "PasswordChangedPleaseLogin": "تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول بكلمة مرور جديدة."
  },
  zh: {
    "NoOTPFound": "未找到OTP。请申请新的OTP。",
    "OTPExpired": "OTP已过期。请申请新的OTP。",
    "OTPInvalid": "OTP无效。",
    "PasswordChangedPleaseLogin": "密码修改成功。请使用新密码登录。"
  },
  ko: {
    "NoOTPFound": "OTP을 찾을 수 없습니다. 새 OTP를 요청해주세요.",
    "OTPExpired": "OTP가 만료되었습니다. 새 OTP를 요청해주세요.",
    "OTPInvalid": "OTP가 유효하지 않습니다.",
    "PasswordChangedPleaseLogin": "비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인해주세요."
  },
  pt: {
    "NoOTPFound": "OTP não encontrado. Por favor, solicite um novo OTP.",
    "OTPExpired": "OTP expirado. Por favor, solicite um novo OTP.",
    "OTPInvalid": "OTP inválido.",
    "PasswordChangedPleaseLogin": "Senha alterada com sucesso. Por favor, entre com a nova senha."
  },
  ru: {
    "NoOTPFound": "OTP не найден. Пожалуйста, запросите новый OTP.",
    "OTPExpired": "OTP истек. Пожалуйста, запросите новый OTP.",
    "OTPInvalid": "OTP недействителен.",
    "PasswordChangedPleaseLogin": "Пароль успешно изменен. Пожалуйста, войдите с новым паролем."
  },
  tr: {
    "NoOTPFound": "OTP bulunamadı. Lütfen yeni bir OTP isteyin.",
    "OTPExpired": "OTP süresi doldu. Lütfen yeni bir OTP isteyin.",
    "OTPInvalid": "OTP geçersiz.",
    "PasswordChangedPleaseLogin": "Şifre başarıyla değiştirildi. Lütfen yeni şifre ile giriş yapın."
  }
};

const languages = ['en', 'id', 'ar', 'zh', 'ko', 'pt', 'ru', 'tr'];

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    // Tambahkan keys baru
    Object.assign(json, apiKeysToAdd[lang]);
    
    // Sort keys secara alfabetis
    const sortedJson = Object.keys(json).sort().reduce((acc, key) => {
      acc[key] = json[key];
      return acc;
    }, {});
    
    fs.writeFileSync(filePath, JSON.stringify(sortedJson, null, 2), 'utf8');
    console.log(`✅ ${lang}.json updated with API keys`);
  } catch (err) {
    console.error(`❌ Error updating ${lang}.json:`, err.message);
  }
});

console.log('\n✅ All language files updated with API keys successfully!');
