const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendRecruitEmail = async (req, res, next) => {
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: process.env.AUTH_EMAIL_TO,
      subject: `Nộp CV - Đăng ký ứng tuyển từ ${req.body.name}`,
      html: `<p><b>Thông tin ứng viên:</b></p>
      <p><i>Họ tên: </i><b>${req.body.name}</b></p>
      <p><i>Địa chỉ: </i><b>${req.body.address}</b></p>
      <p><i>Giới tính: </i><b>${req.body.gender}</b></p>
      <p><i>Năm sinh: </i><b>${req.body.birthday}</b></p>
      <p><i>Trường tốt nghiệp: </i><b>${req.body.university}</b></p>
      <p><i>Chuyên ngành: </i><b>${req.body.major}</b></p>
      <p><i>Điện thoại: </i><b>${req.body.phone}</b></p>
      <p><i>Email: </i><b>${req.body.email}</b></p>
      <p><i>Nội dung: </i><b>${req.body.content}</b></p>`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const sendContactEmail = async (req, res, next) => {
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: process.env.AUTH_EMAIL_TO,
      subject: `Liên hệ từ ${req.body.name}`,
      html: `<p><b>Thông tin liên lạc:</b></p>
      <p><i>Họ tên: </i><b>${req.body.name}</b></p>
      <p><i>Tên công ty: </i><b>${req.body.company}</b></p>
      <p><i>Địa chỉ: </i><b>${req.body.address}</b></p>
      <p><i>Điện thoại: </i><b>${req.body.phone}</b></p>
      <p><i>Email: </i><b>${req.body.email}</b></p>
      <p><i>Nội dung: </i><b>${req.body.content}</b></p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recruitEmail: async (req, res, next) => {
    try {
      sendRecruitEmail(req, res, next);
    } catch (error) {
      next(error);
    }
  },

  contactEmail: async (req, res, next) => {
    try {
      sendContactEmail(req, res, next);
    } catch (error) {
      next(error);
    }
  },
};
