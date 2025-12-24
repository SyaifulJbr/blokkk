const fs = require('fs');
const path = require('path');

const keysToAdd = {
  en: {
    "EmailNotVerified": "Email not verified. Please verify your email first.",
    "EmailAlreadyRegistered": "Email is already registered",
    "OTPInvalid": "OTP is invalid",
    "ResetPassword": "Reset Password",
    "ResendOTP": "Resend OTP",
    "BackToHome": "Back to Home"
  },
  id: {
    "EmailNotVerified": "Email belum diverifikasi. Silakan verifikasi email Anda terlebih dahulu.",
    "EmailAlreadyRegistered": "Email sudah terdaftar",
    "OTPInvalid": "OTP tidak valid",
    "ResetPassword": "Reset Kata Sandi",
    "ResendOTP": "Kirim Ulang OTP",
    "BackToHome": "Kembali ke Beranda"
  },
  ar: {
    "EmailNotVerified": "البريد الإلكتروني غير مُحقق. الرجاء التحقق من بريدك الإلكتروني أولاً.",
    "EmailAlreadyRegistered": "البريد الإلكتروني مسجل بالفعل",
    "OTPInvalid": "OTP غير صالح",
    "ResetPassword": "إعادة تعيين كلمة المرور",
    "ResendOTP": "إعادة إرسال OTP",
    "BackToHome": "العودة إلى الرئيسية"
  },
  zh: {
    "EmailNotVerified": "邮箱未验证。请先验证您的邮箱。",
    "EmailAlreadyRegistered": "该邮箱已注册",
    "OTPInvalid": "OTP无效",
    "ResetPassword": "重置密码",
    "ResendOTP": "重新发送OTP",
    "BackToHome": "返回首页"
  },
  ko: {
    "EmailNotVerified": "이메일이 확인되지 않았습니다. 먼저 이메일을 확인해주세요.",
    "EmailAlreadyRegistered": "이메일은 이미 등록되었습니다",
    "OTPInvalid": "OTP가 유효하지 않습니다",
    "ResetPassword": "비밀번호 재설정",
    "ResendOTP": "OTP 재전송",
    "BackToHome": "홈으로 돌아가기"
  },
  pt: {
    "EmailNotVerified": "Email não verificado. Por favor, verifique seu email primeiro.",
    "EmailAlreadyRegistered": "Email já registrado",
    "OTPInvalid": "OTP inválido",
    "ResetPassword": "Redefinir Senha",
    "ResendOTP": "Reenviar OTP",
    "BackToHome": "Voltar ao Início"
  },
  ru: {
    "EmailNotVerified": "Email не подтвержден. Пожалуйста, подтвердите ваш email сначала.",
    "EmailAlreadyRegistered": "Email уже зарегистрирован",
    "OTPInvalid": "OTP недействителен",
    "ResetPassword": "Сбросить пароль",
    "ResendOTP": "Отправить OTP снова",
    "BackToHome": "Вернуться на главную"
  },
  tr: {
    "EmailNotVerified": "E-posta doğrulanmadı. Lütfen önce e-postanızı doğrulayın.",
    "EmailAlreadyRegistered": "E-posta zaten kayıtlı",
    "OTPInvalid": "OTP geçersiz",
    "ResetPassword": "Şifre Sıfırla",
    "ResendOTP": "OTP'yi Tekrar Gönder",
    "BackToHome": "Anasayfaya Dön"
  }
};

const languages = ['en', 'id', 'ar', 'zh', 'ko', 'pt', 'ru', 'tr'];

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    // Tambahkan keys baru
    Object.assign(json, keysToAdd[lang]);
    
    // Hapus key duplikat jika ada (khususnya untuk EmailAlreadyRegistered)
    // Tidak perlu menghapus karena kita akan menimpa dengan value yang benar
    
    // Sort keys secara alfabetis
    const sortedJson = Object.keys(json).sort().reduce((acc, key) => {
      acc[key] = json[key];
      return acc;
    }, {});
    
    fs.writeFileSync(filePath, JSON.stringify(sortedJson, null, 2), 'utf8');
    console.log(`✅ ${lang}.json updated`);
  } catch (err) {
    console.error(`❌ Error updating ${lang}.json:`, err.message);
  }
});

console.log('\n✅ All language files updated successfully!');
