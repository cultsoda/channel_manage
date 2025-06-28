import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Download, Calendar } from "lucide-react"

export default function SettlementPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">정산</h1>
        <p className="text-muted-foreground">수익 정산을 신청하고 내역을 확인하세요.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">정산 가능 금액</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 1,847,500</div>
            <p className="text-xs text-muted-foreground">수수료 차감 후</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 수익</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 2,450,000</div>
            <p className="text-xs text-muted-foreground">수수료 차감 전</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">다음 정산일</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1월 15일</div>
            <p className="text-xs text-muted-foreground">매월 15일 정산</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>정산 신청</CardTitle>
            <CardDescription>정산 받을 계좌 정보를 입력하고 신청하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">은행명</Label>
              <select id="bankName" className="w-full p-2 border rounded-md">
                <option>은행을 선택하세요</option>
                <option>국민은행</option>
                <option>신한은행</option>
                <option>우리은행</option>
                <option>하나은행</option>
                <option>기업은행</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">계좌번호</Label>
              <Input id="accountNumber" placeholder="계좌번호를 입력하세요" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">예금주</Label>
              <Input id="accountHolder" placeholder="예금주명을 입력하세요" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="settlementAmount">정산 신청 금액</Label>
              <Input id="settlementAmount" type="number" placeholder="1847500" defaultValue="1847500" />
            </div>

            <Button className="w-full">정산 신청</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>세금 정보</CardTitle>
            <CardDescription>세금계산서 및 소득 증명서를 관리하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">2024년 소득 증명서</p>
                  <p className="text-sm text-muted-foreground">연간 소득 내역</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">12월 세금계산서</p>
                  <p className="text-sm text-muted-foreground">2024.12.01 - 2024.12.31</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              세무 관련 안내 보기
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>정산 내역</CardTitle>
          <CardDescription>과거 정산 내역을 확인하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>정산일</TableHead>
                <TableHead>정산 금액</TableHead>
                <TableHead>수수료</TableHead>
                <TableHead>실지급액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">보고서</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {settlementHistory.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell>{settlement.date}</TableCell>
                  <TableCell>₩ {settlement.amount.toLocaleString()}</TableCell>
                  <TableCell>₩ {settlement.fee.toLocaleString()}</TableCell>
                  <TableCell>₩ {settlement.netAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={settlement.status === "완료" ? "default" : "secondary"}>{settlement.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const settlementHistory = [
  {
    id: "1",
    date: "2024.12.15",
    amount: 2100000,
    fee: 252000,
    netAmount: 1848000,
    status: "완료",
  },
  {
    id: "2",
    date: "2024.11.15",
    amount: 1850000,
    fee: 222000,
    netAmount: 1628000,
    status: "완료",
  },
  {
    id: "3",
    date: "2024.10.15",
    amount: 1650000,
    fee: 198000,
    netAmount: 1452000,
    status: "완료",
  },
]
