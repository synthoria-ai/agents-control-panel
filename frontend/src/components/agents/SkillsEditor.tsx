import { useState, useEffect, useRef, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SkillsEditorProps {
    initialValue?: string;
    filePath?: string;
}

const SkillsEditor = ({
    initialValue = "# Content Research Intent\n\n- [ ] Analyze trends\n- [ ] Generate ideas",
    filePath = "skills/default.md"
}: SkillsEditorProps) => {
    const [value, setValue] = useState(initialValue);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'unsaved'>('idle');
    const editorRef = useRef<any>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-save logic
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (value !== initialValue && saveStatus !== 'saving') {
            setSaveStatus('unsaved');
            timeoutRef.current = setTimeout(() => {
                handleSave();
            }, 2000);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [value, initialValue]); // Added initialValue to dependency array

    const handleEditorChange = (val: string | undefined) => {
        setValue(val || "");
    };

    const handleSave = useCallback(async () => {
        if (value === initialValue) return;

        setSaveStatus('saving');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
        toast.success("Skills file saved");
    }, [value, initialValue]);

    const handleRevert = () => {
        setValue(initialValue);
        setSaveStatus('idle');
        if (editorRef.current) {
            editorRef.current.setValue(initialValue);
        }
        toast.info("Changes reverted");
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Add Cmd+S / Ctrl+S Keybinding
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            handleSave();
        });
    };

    return (
        <div className="flex flex-col border rounded-md overflow-hidden bg-[#1e1e1e] h-[calc(100vh-250px)]">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border">
                <div className="flex items-center space-x-3">
                    <span className="text-sm font-mono text-muted-foreground">{filePath}</span>

                    {/* Status Indicator */}
                    <div className="flex items-center text-xs space-x-1.5 transition-all">
                        {saveStatus === 'saving' && (
                            <>
                                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                                <span className="text-muted-foreground">Saving...</span>
                            </>
                        )}

                        {saveStatus === 'saved' && (
                            <>
                                <Check className="w-3 h-3 text-green-400" />
                                <span className="text-muted-foreground">Saved</span>
                            </>
                        )}

                        {saveStatus === 'unsaved' && (
                            <span className="w-2 h-2 rounded-full bg-yellow-500" title="Unsaved changes" />
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRevert}
                        disabled={value === initialValue}
                        title="Revert to original"
                    >
                        <RotateCcw className="w-4 h-4 mr-1" /> Revert
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => handleSave()}
                        disabled={saveStatus === 'saving' || value === initialValue}
                    >
                        <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                </div>
            </div>
            <div className="flex-1 min-h-0 bg-[#1e1e1e]">
                <Editor
                    height="100%"
                    defaultLanguage="markdown"
                    value={value}
                    theme="vs-dark"
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 }
                    }}
                    className="h-full"
                />
            </div>
        </div>
    );
};

export default SkillsEditor;
