import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemainder = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secondsRemainder}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secondsRemainder}s`;
  } else {
    return `${secondsRemainder}s`;
  }
}

export function calculateProgress(completedNodes: string[], totalNodes: number): number {
  return Math.round((completedNodes.length / totalNodes) * 100);
}

export function getDifficultyColor(difficulty: 'beginner' | 'intermediate' | 'advanced'): string {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-400 bg-green-400/20';
    case 'intermediate':
      return 'text-yellow-400 bg-yellow-400/20';
    case 'advanced':
      return 'text-red-400 bg-red-400/20';
    default:
      return 'text-gray-400 bg-gray-400/20';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'frontend':
      return 'text-blue-400 bg-blue-400/20';
    case 'backend':
      return 'text-purple-400 bg-purple-400/20';
    case 'database':
      return 'text-green-400 bg-green-400/20';
    case 'devops':
      return 'text-orange-400 bg-orange-400/20';
    case 'tools':
      return 'text-pink-400 bg-pink-400/20';
    default:
      return 'text-gray-400 bg-gray-400/20';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function exportToPDF(element: HTMLElement, filename: string = 'roadmap.pdf'): void {
  import('html2canvas').then((html2canvas) => {
    import('jspdf').then((jsPDF) => {
      html2canvas.default(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF.default();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(filename);
      });
    });
  });
}
