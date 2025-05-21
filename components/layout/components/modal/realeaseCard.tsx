import { Card, Typography, Tag } from "antd";

const { Title, Text } = Typography;

interface Release {
  id: number;
  name: string;
  tag_name: string;
  created_at: string;
  description: string;
}

interface ReleaseCardProps {
  release: Release;
  isLatest: boolean;
}

export default function ReleaseCard({ release, isLatest }: ReleaseCardProps) {
  return (
    <Card
      className="max-w-2xl mx-auto shadow-md border border-gray-300 mb-4"
      title={
        <div className="flex items-center justify-between">
          <Title level={3}>
            v{release.tag_name} <Tag color={isLatest ? "green" : "red"}>{isLatest ? "Latest" : "Old"}</Tag>
          </Title>
        </div>
      }
    >
      <Title level={4} className="mt-2 pt-0">Implementazioni</Title>
      <div>
        {release.description.split("\n").map((item, index) => {
          const trimmedItem = item.trim();
          const isTitle = !trimmedItem.includes("-");

          return isTitle ? (
            <Title level={5} key={index} className="mt-3">{trimmedItem}</Title>
          ) : (
            <ul className="list-disc pl-5">
              <li key={index}>
                <Text className="block "> {trimmedItem.replace("-", "").trim()}</Text>
              </li>
            </ul>
          );
        })}
      </div>
    </Card>
  );
}
