import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Upload, Link2, FileText, Video, Mic, Image, X, CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import { getSubjectConfig } from '../utils/subjectConfig';
import { saveMaterial, loadMaterials, deleteMaterial } from '../utils/storage';
import { StudyMaterial } from '../types';

type InputTab = 'file' | 'url' | 'text';

export default function UploadPage() {
  const { subject = 'math' } = useParams<{ subject: string }>();
  const cfg = getSubjectConfig(subject);
  const [tab, setTab] = useState<InputTab>('text');
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [materials, setMaterials] = useState<StudyMaterial[]>(() => loadMaterials(cfg.id));
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!titleInput.trim()) return;
    const content = tab === 'text' ? textInput : tab === 'url' ? urlInput : '';
    if (!content.trim()) return;
    const mat: StudyMaterial = {
      id: Date.now().toString(),
      subject: cfg.id,
      title: titleInput.trim(),
      content: content.trim(),
      type: tab === 'url' ? 'url' : 'text',
      uploadedAt: new Date().toISOString(),
    };
    saveMaterial(mat);
    setMaterials(loadMaterials(cfg.id));
    setTitleInput('');
    setTextInput('');
    setUrlInput('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const mat: StudyMaterial = {
        id: Date.now().toString(),
        subject: cfg.id,
        title: file.name,
        content: ev.target?.result as string ?? '',
        type: file.type.includes('video') ? 'video' : file.type.includes('audio') ? 'podcast' : file.type.includes('image') ? 'image' : 'pdf',
        uploadedAt: new Date().toISOString(),
      };
      saveMaterial(mat);
      setMaterials(loadMaterials(cfg.id));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };
    reader.readAsText(file);
  };

  const handleDelete = (id: string) => {
    deleteMaterial(id);
    setMaterials(loadMaterials(cfg.id));
  };

  const typeIcons: Record<string, React.ReactNode> = {
    pdf: <FileText className="w-4 h-4" />,
    url: <Link2 className="w-4 h-4" />,
    text: <FileText className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    podcast: <Mic className="w-4 h-4" />,
    image: <Image className="w-4 h-4" />,
    googledoc: <FileText className="w-4 h-4" />,
  };

  const tabs: { id: InputTab; label: string; icon: React.ReactNode }[] = [
    { id: 'text', label: 'Paste Text', icon: <FileText className="w-4 h-4" /> },
    { id: 'url', label: 'URL / Link', icon: <Link2 className="w-4 h-4" /> },
    { id: 'file', label: 'Upload File', icon: <Upload className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <Link to={`/subject/${subject}`} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `linear-gradient(135deg, ${cfg.accentColor}33, ${cfg.accentColor}66)` }}
          >
            {cfg.emoji}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Upload Materials</h1>
            <p className="text-slate-400 text-xs">{cfg.name} — add your study content</p>
          </div>
        </div>

        {/* Accepted formats banner */}
        <div className="flex flex-wrap gap-2 mb-5 animate-slide-up" style={{ animationDelay: '0.04s' }}>
          {[
            { icon: '📄', label: 'PDFs' },
            { icon: '🌐', label: 'Websites' },
            { icon: '📝', label: 'Text' },
            { icon: '🎥', label: 'Videos' },
            { icon: '🎙️', label: 'Podcasts' },
            { icon: '📷', label: 'Images' },
            { icon: '📊', label: 'Google Docs' },
          ].map(f => (
            <span
              key={f.label}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1"
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        {/* Input form */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 mb-5 animate-slide-up" style={{ animationDelay: '0.08s' }}>
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-900/60 rounded-xl p-1 mb-4">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-slate-700 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Title (e.g. Chapter 5 Notes)"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm mb-3 focus:outline-none focus:border-indigo-500"
          />

          {tab === 'text' && (
            <textarea
              placeholder="Paste your notes, textbook content, or any study material here…"
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              rows={6}
              className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-indigo-500"
            />
          )}

          {tab === 'url' && (
            <div className="space-y-2">
              <input
                type="url"
                placeholder="https://... (website, YouTube, Google Doc, podcast)"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
              />
              <p className="text-xs text-slate-500">Paste a URL to a website, YouTube video, Google Doc, or podcast episode.</p>
            </div>
          )}

          {tab === 'file' && (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-xl p-8 text-center cursor-pointer transition-colors"
            >
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-300 font-medium text-sm">Click to upload a file</p>
              <p className="text-slate-500 text-xs mt-1">PDF, TXT, MP4, MP3, JPG, PNG</p>
              <input ref={fileRef} type="file" className="hidden" onChange={handleFile} accept=".pdf,.txt,.mp4,.mp3,.jpg,.jpeg,.png,.doc,.docx" />
            </div>
          )}

          {tab !== 'file' && (
            <button
              onClick={handleSave}
              disabled={!titleInput.trim() || (tab === 'text' ? !textInput.trim() : !urlInput.trim())}
              className="mt-4 w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: saved ? '#10B981' : cfg.accentColor }}
            >
              {saved ? (
                <><CheckCircle className="w-4 h-4" /> Saved!</>
              ) : (
                <><Plus className="w-4 h-4" /> Add Material</>
              )}
            </button>
          )}
        </div>

        {/* Saved materials */}
        {materials.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '0.12s' }}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              Your Materials ({materials.length})
            </h2>
            <div className="space-y-2">
              {materials.map(mat => (
                <div
                  key={mat.id}
                  className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${cfg.accentColor}20`, color: cfg.accentColor }}
                  >
                    {typeIcons[mat.type] ?? <FileText className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{mat.title}</div>
                    <div className="text-xs text-slate-500 truncate">
                      {mat.type.toUpperCase()} · {new Date(mat.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(mat.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {materials.length > 0 && (
          <Link
            to={`/subject/${subject}/study-guide`}
            className="mt-5 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: cfg.accentColor }}
          >
            Generate Study Guide →
          </Link>
        )}
      </div>
    </div>
  );
}
