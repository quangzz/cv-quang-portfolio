import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Bắt lỗi toàn cục đảm bảo giao diện luôn thân thiện với người dùng
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DEBUG][ErrorBoundary] Lỗi xảy ra khi hiển thị giao diện:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-md w-full rounded-3xl p-8 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-center shadow-xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Đã xảy ra sự cố hiển thị
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Không thể tải một phần giao diện. Vui lòng tải lại trang để tiếp tục xem hồ sơ.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
