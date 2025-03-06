import dbConnect from '../../../../lib/dbConnect';
import Project from '../../../../models/Project';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();
  
  try {
    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  
  try {
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}