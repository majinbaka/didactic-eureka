export const MAZE_GATE = 1500
export const SUMMIT_GATE = 3000

export const openingScenes = [
  { speaker: 'Vô Danh · Nội tâm', title: 'Tỉnh giác giữa Rừng Trúc U Tinh', text: 'Gió lạnh quá... Cuối cùng cũng tới được Rừng Trúc U Tinh rồi sao?' },
  { speaker: 'Vô Danh · Nội tâm', title: 'Đại lễ mười năm một lần', text: 'Gia tộc suy vong, bản thân lại mang phế linh căn. Nếu không thể bái nhập Thái Huyền Tông lần này, ta sẽ chẳng còn cơ hội quay đầu. Bất luận thế nào, hôm nay ta phải giành lấy một trong 5 vị trí đầu tiên!' },
  { speaker: 'Dẫn chuyện', title: 'Tiếng pháo hiệu xuất phát', text: 'Hàng trăm tu sĩ trẻ tuổi tụ giữa rừng trúc. Trên ngọn trúc cao nhất, một vị trưởng lão áo trắng lướt qua hư không, giọng nói ngân như chuông đồng.' },
  { speaker: 'Trưởng lão Thái Huyền Tông', title: 'Trúc Linh Phong · Thử thách nhập môn', text: 'Rừng Trúc U Tinh là cửa quan đầu tiên! Chỉ 5 người đầu tiên vượt qua rừng trúc và bước lên ngọn Linh Phong mới có quyền trở thành Đệ tử Nội môn. Tiên duyên ở ngay trước mắt... Khai cuộc!' },
]

export const mazeRiddle = {
  speaker: 'Bia đá trận pháp',
  title: 'Mê Cung Trúc Lâm',
  text: '“Trúc hư tâm dĩ hữu tiết, phong quá bất lưu thanh. Sinh môn nằm ở nơi ngọn trúc nghiêng theo bóng nắng; lạc bước vào Tử môn, ngàn trượng trúc giáp sẽ giam cầm.”',
  choices: [
    { id: 'left', label: 'Cửa trái', hint: 'Trúc nghiêng theo bóng nắng' },
    { id: 'middle', label: 'Cửa giữa', hint: 'Linh lực dao động mạnh' },
    { id: 'right', label: 'Cửa phải', hint: 'Sương tím thưa hơn' },
  ],
}

export function prologuePhase(x, mazeSolved = false) {
  if (x >= SUMMIT_GATE && mazeSolved) return 'complete'
  if (x >= MAZE_GATE && !mazeSolved) return 'maze'
  if (x >= MAZE_GATE) return 'summit'
  return 'forest'
}

export function resolveMaze(choice) {
  return choice === 'left'
    ? { solved: true, message: 'Bóng nắng xác nhận Sinh môn. Những thân trúc tách ra, để lộ đường lên Linh Phong!' }
    : { solved: false, message: 'Trúc giáp khép chặt! Đây là Tử môn. Bạn lùi lại trước bia đá để quan sát bóng nắng.' }
}
