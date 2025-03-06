import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '프로젝트 제목을 입력해주세요'],
    maxlength: [100, '프로젝트 제목은 100자 이내여야 합니다'],
  },
  url: {
    type: String,
    required: [true, 'URL을 입력해주세요'],
  },
  description: {
    type: String,
    required: [true, '설명을 입력해주세요'],
  },
  features: {
    type: [String],
    required: [true, '주요 기능을 하나 이상 입력해주세요'],
  },
  technologies: {
    type: [String],
    required: [true, '사용 기술을 하나 이상 입력해주세요'],
  },
  category: {
    type: String,
    required: [true, '카테고리를 선택해주세요'],
  },
  isEnterprise: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '🤖',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);