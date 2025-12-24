const fs = require('fs');
const path = require('path');

const keysToAdd = {
  en: {
    "Enter6DigitCodeSentToEmail": "Enter 6-digit code sent to your email",
    "ResetPasswordTitle": "Reset Password",
    "ResendOTPButton": "Resend OTP",
    "BackToHomeButton": "Back to Home",
    "EmailNotVerifiedPleaseVerifyFirst": "Email not verified. Please verify your email first."
  },
  id: {
    "Enter6DigitCodeSentToEmail": "Masukkan kode 6 digit yang dikirim ke email Anda",
    "ResetPasswordTitle": "Reset Kata Sandi",
    "ResendOTPButton": "Kirim Ulang OTP",
    "BackToHomeButton": "Kembali ke Beranda",
    "EmailNotVerifiedPleaseVerifyFirst": "Email belum diverifikasi. Silakan verifikasi email Anda terlebih dahulu."
  },
  ar: {
    "Enter6DigitCodeSentToEmail": "أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني",
    "ResetPasswordTitle": "إعادة تعيين كلمة المرور",
    "ResendOTPButton": "إعادة إرسال OTP",
    "BackToHomeButton": "العودة إلى الرئيسية",
    "EmailNotVerifiedPleaseVerifyFirst": "البريد الإلكتروني غير مُحقق. الرجاء التحقق من بريدك الإلكتروني أولاً."
  },
  zh: {
    "Enter6DigitCodeSentToEmail": "输入发送到您邮箱的6位数字代码",
    "ResetPasswordTitle": "重置密码",
    "ResendOTPButton": "重新发送OTP",
    "BackToHomeButton": "返回首页",
    "EmailNotVerifiedPleaseVerifyFirst": "邮箱未验证。请先验证您的邮箱。"
  },
  ko: {
    "Enter6DigitCodeSentToEmail": "이메일로 전송된 6자리 숫자 코드를 입력하세요",
    "ResetPasswordTitle": "비밀번호 재설정",
    "ResendOTPButton": "OTP 재전송",
    "BackToHomeButton": "홈으로 돌아가기",
    "EmailNotVerifiedPleaseVerifyFirst": "이메일이 확인되지 않았습니다. 먼저 이메일을 확인해주세요."
  },
  pt: {
    "Enter6DigitCodeSentToEmail": "Digite o código de 6 dígitos enviado para seu email",
    "ResetPasswordTitle": "Redefinir Senha",
    "ResendOTPButton": "Reenviar OTP",
    "BackToHomeButton": "Voltar ao Início",
    "EmailNotVerifiedPleaseVerifyFirst": "Email não verificado. Por favor, verifique seu email primeiro."
  },
  ru: {
    "Enter6DigitCodeSentToEmail": "Введите 6-значный код, отправленный на ваш email",
    "ResetPasswordTitle": "Сбросить пароль",
    "ResendOTPButton": "Отправить OTP снова",
    "BackToHomeButton": "Вернуться на главную",
    "EmailNotVerifiedPleaseVerifyFirst": "Email не подтвержден. Пожалуйста, подтвердите ваш email сначала."
  },
  tr: {
    "Enter6DigitCodeSentToEmail": "E-postanıza gönderilen 6 haneli kodu girin",
    "ResetPasswordTitle": "Şifre Sıfırla",
    "ResendOTPButton": "OTP'yi Tekrar Gönder",
    "BackToHomeButton": "Anasayfaya Dön",
    "EmailNotVerifiedPleaseVerifyFirst": "E-posta doğrulanmadı. Lütfen önce e-postanızı doğrulayın."
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
