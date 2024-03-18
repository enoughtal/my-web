import { readdir, readFile, stat } from 'fs/promises';
import path from 'path';

/* 读取文件，返回文件内容和创建时间 */
async function getFile(req, res, next) {
  const { subject, filename } = req.body;

  try {
    const filePath = path.resolve('public', subject, filename);
    const text = await readFile(filePath, { encoding: 'utf8' });
    const stats = await stat(filePath);
    const data = {
      text,
      createdAt: stats.birthtimeMs,
    };
    res.send(data);
  } catch (err) {
    next(err);
  }
}

/* 获取目录结构 */
async function getCategory(req, res, next) {
  let result = [];

  async function getFilesInDir(dir, result) {
    const entries = await readdir(dir);

    for (const entry of entries) {
      const subDir = path.resolve(dir, entry);
      const stats = await stat(subDir);

      if (stats.isDirectory()) {
        const arr = [];
        result.push({ [entry]: arr });
        await getFilesInDir(subDir, arr); //递归调用
      } else {
        result.push(path.basename(entry, path.extname(entry))); //去除扩展名
      }
    }
  }

  try {
    await getFilesInDir('public', result);
  } catch (err) {
    next(err);
  }

  result = result.reduce((prev, cur) => ({ ...prev, ...cur }));
  res.send(result);
}

async function getProjects(req, res, next) {
  try {
    const filePath = path.resolve('private', 'projects.json');
    const json = await readFile(filePath, { encoding: 'utf8' });
    res.send(json);
  } catch (err) {
    next(err);
  }
}

async function getResume(req, res, next) {
  try {
    const filePath = path.resolve('private', 'personalStatement.md');
    const text = await readFile(filePath, { encoding: 'utf8' });
    res.send(text);
  } catch (err) {
    next(err);
  }
}

export default function filesRoute(app) {
  app.post('/getFile', getFile);
  app.get('/getCategory', getCategory);
  app.get('/getProjects', getProjects);
  app.get('/getResume', getResume);
}
