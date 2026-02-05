// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="SUMMARY.html"><strong aria-hidden="true">1.</strong> Summary</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/index.html"><strong aria-hidden="true">2.</strong> Cheatsheets</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/api_architecture_styles.html"><strong aria-hidden="true">2.1.</strong> API Architectural Styles</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/cap_theorem.html"><strong aria-hidden="true">2.2.</strong> cap theorem</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/crackmapexec.html"><strong aria-hidden="true">2.3.</strong> crackmapexec</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/dig.html"><strong aria-hidden="true">2.4.</strong> dig</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/enum4linux.html"><strong aria-hidden="true">2.5.</strong> enum4linux</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/ettercap.html"><strong aria-hidden="true">2.6.</strong> ettercap</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/ffuf.html"><strong aria-hidden="true">2.7.</strong> ffuf</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/fierce.html"><strong aria-hidden="true">2.8.</strong> fierce</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/hashcat.html"><strong aria-hidden="true">2.9.</strong> hashcat</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/hydra.html"><strong aria-hidden="true">2.10.</strong> hydra</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/impacket.html"><strong aria-hidden="true">2.11.</strong> impacket</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/john.html"><strong aria-hidden="true">2.12.</strong> john the ripper</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/latency_numbers.html"><strong aria-hidden="true">2.13.</strong> Latency Numbers Every SRE Should Know</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/lazagne.html"><strong aria-hidden="true">2.14.</strong> lazagne</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/make_files.html"><strong aria-hidden="true">2.15.</strong> Make Files</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/medusa.html"><strong aria-hidden="true">2.16.</strong> medusa</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/metasploit.html"><strong aria-hidden="true">2.17.</strong> Metasploit</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/mimikatz.html"><strong aria-hidden="true">2.18.</strong> mimikatz</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/msfvenom.html"><strong aria-hidden="true">2.19.</strong> msfvenom</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/ncat.html"><strong aria-hidden="true">2.20.</strong> ncat</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/neovim.html"><strong aria-hidden="true">2.21.</strong> Neovim</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/netcat.html"><strong aria-hidden="true">2.22.</strong> netcat</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/nikto.html"><strong aria-hidden="true">2.23.</strong> nikto</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/nmap.html"><strong aria-hidden="true">2.24.</strong> nmap</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/powershell.html"><strong aria-hidden="true">2.25.</strong> powershell</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/pypykatz.html"><strong aria-hidden="true">2.26.</strong> pypykatz</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/ranger.html"><strong aria-hidden="true">2.27.</strong> Ranger</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/rdp.html"><strong aria-hidden="true">2.28.</strong> rdp</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/regex.html"><strong aria-hidden="true">2.29.</strong> Regex</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/responder.html"><strong aria-hidden="true">2.30.</strong> responder</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/rpcclient.html"><strong aria-hidden="true">2.31.</strong> rpcclient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/rubeus.html"><strong aria-hidden="true">2.32.</strong> rubeus</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/ssti.html"><strong aria-hidden="true">2.33.</strong> server-side template injection</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/smbclient.html"><strong aria-hidden="true">2.34.</strong> smbclient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/smbmap.html"><strong aria-hidden="true">2.35.</strong> smbmap</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/ssh.html"><strong aria-hidden="true">2.36.</strong> ssh</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/http_headers.html"><strong aria-hidden="true">2.37.</strong> standard http headers</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/tsql.html"><strong aria-hidden="true">2.38.</strong> tsql</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/unshadow.html"><strong aria-hidden="true">2.39.</strong> unshadow</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/wafw00f.html"><strong aria-hidden="true">2.40.</strong> wafw00f</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/windows-credential-manager.html"><strong aria-hidden="true">2.41.</strong> windows-credential-manager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="cheatsheets/yaml.html"><strong aria-hidden="true">2.42.</strong> yaml</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/index.html"><strong aria-hidden="true">3.</strong> Clouds</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/index.html"><strong aria-hidden="true">3.1.</strong> AWS</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/index.html"><strong aria-hidden="true">3.1.1.</strong> AWS-Solutions-Architect-Associate-notes</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/APIGateway/api-gateway-cheatsheet.html"><strong aria-hidden="true">3.1.1.1.</strong> Api-gateway-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/RDS-and-Aurora/aurora-cheatsheet.html"><strong aria-hidden="true">3.1.1.2.</strong> Aurora Cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/notes_ttd_tests.html"><strong aria-hidden="true">3.1.1.3.</strong> AWS Certified Solutions Architect Associate Practice Exams</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/CloudFront/cloudfront-cheatsheet.html"><strong aria-hidden="true">3.1.1.4.</strong> Cloudfront-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/CloudFront/cloudfront.html"><strong aria-hidden="true">3.1.1.5.</strong> CloudFront</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Disaster-Recovery-Migrations/disaster-recover-migrations.html"><strong aria-hidden="true">3.1.1.6.</strong> Disaster Recovery</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Disaster-Recovery-Migrations/disaster-recovery-cheatsheet.html"><strong aria-hidden="true">3.1.1.7.</strong> Disaster-recovery-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Route53/route53.html"><strong aria-hidden="true">3.1.1.8.</strong> DNS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/EC2/Ec2.html"><strong aria-hidden="true">3.1.1.9.</strong> EC2</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/EFS/efs.html"><strong aria-hidden="true">3.1.1.10.</strong> Elastic File System (EFS)</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/EC2/elb.html"><strong aria-hidden="true">3.1.1.11.</strong> Elastic Load Balancer</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Glue/glue-cheatsheet.html"><strong aria-hidden="true">3.1.1.12.</strong> Glue-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/security/iam.html"><strong aria-hidden="true">3.1.1.13.</strong> IAM</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Storage/storage.html"><strong aria-hidden="true">3.1.1.14.</strong> Introduction to S3</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/VPC/vpc.html"><strong aria-hidden="true">3.1.1.15.</strong> Introduction to VPC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Lambda/lambda.html"><strong aria-hidden="true">3.1.1.16.</strong> AWS Lambda</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Machine-Learning-Models/ml-models.html"><strong aria-hidden="true">3.1.1.17.</strong> Ml-models</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Application-Integration/application-integration.html"><strong aria-hidden="true">3.1.1.18.</strong> Queueing (SQS)</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/RDS-and-Aurora/rds-and-aurora.html"><strong aria-hidden="true">3.1.1.19.</strong> RDS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Redshift/redshift.html"><strong aria-hidden="true">3.1.1.20.</strong> Amazon Redshift</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/EC2/ec2-pricing.html"><strong aria-hidden="true">3.1.1.21.</strong> Savings Plan</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/security/security.html"><strong aria-hidden="true">3.1.1.22.</strong> AWS Certificate Manager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Storage/storage-cheatsheet.html"><strong aria-hidden="true">3.1.1.23.</strong> Storage-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/study-more.html"><strong aria-hidden="true">3.1.1.24.</strong> Study-more</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/overview.html"><strong aria-hidden="true">3.1.1.25.</strong> Table of Contents</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/tutorialsdojo_cheatsheets.html"><strong aria-hidden="true">3.1.1.26.</strong> Tutorialsdojo Cheatsheets</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/VPC/vpc-endpoint-cheatsheet.html"><strong aria-hidden="true">3.1.1.27.</strong> Vpc-endpoint-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/VPC/vpc-flow-logs-cheatsheet.html"><strong aria-hidden="true">3.1.1.28.</strong> Vpc-flow-logs-cheatsheet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Quicksight/quicksight.html"><strong aria-hidden="true">3.1.1.29.</strong> What is Amazon QuickSight ?</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/Database/database.html"><strong aria-hidden="true">3.1.1.30.</strong> What is Database ?</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/saa-c03/ElastiCache/elasticache.html"><strong aria-hidden="true">3.1.1.31.</strong> What is ElastiCache for Redis?</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/index.html"><strong aria-hidden="true">3.1.2.</strong> DVA-C02-notes</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/rds/aurora.html"><strong aria-hidden="true">3.1.2.1.</strong> Aurora</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/cloudformation/cloudformation.html"><strong aria-hidden="true">3.1.2.2.</strong> CloudFormation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/cloudfront/cloudfront.html"><strong aria-hidden="true">3.1.2.3.</strong> CloudFront</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/monitoring/cloudtrail.html"><strong aria-hidden="true">3.1.2.4.</strong> CloudTrail</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/monitoring/cloudwatch.html"><strong aria-hidden="true">3.1.2.5.</strong> CloudWatch</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/containers/copilot.html"><strong aria-hidden="true">3.1.2.6.</strong> Copilot</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/dynamodb/dynamodb.html"><strong aria-hidden="true">3.1.2.7.</strong> Dynamodb</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/ec2/ec2.html"><strong aria-hidden="true">3.1.2.8.</strong> EC2</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/beanstalk/beanstalk.html"><strong aria-hidden="true">3.1.2.9.</strong> Elastic Beanstalk</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/containers/ecr.html"><strong aria-hidden="true">3.1.2.10.</strong> Elastic Container Registry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/containers/ecs.html"><strong aria-hidden="true">3.1.2.11.</strong> Elastic Container Service</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/elasticache/elasticache.html"><strong aria-hidden="true">3.1.2.12.</strong> Elasticache</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/iam/iam.html"><strong aria-hidden="true">3.1.2.13.</strong> IAM</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/kinesis/kinesis.html"><strong aria-hidden="true">3.1.2.14.</strong> Kinesis</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/lambda/lambda.html"><strong aria-hidden="true">3.1.2.15.</strong> Lambda</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/rds/rds.html"><strong aria-hidden="true">3.1.2.16.</strong> RDS (Relational Database Service)</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/route53/route53.html"><strong aria-hidden="true">3.1.2.17.</strong> Route53</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/s3/s3.html"><strong aria-hidden="true">3.1.2.18.</strong> S3</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/sns/sns.html"><strong aria-hidden="true">3.1.2.19.</strong> Simple Notification System</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/sqs/sqs.html"><strong aria-hidden="true">3.1.2.20.</strong> Simple Queue System</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/vpc/vpc.html"><strong aria-hidden="true">3.1.2.21.</strong> VPC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/aws/dva-c02/monitoring/x-ray.html"><strong aria-hidden="true">3.1.2.22.</strong> x-ray</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/index.html"><strong aria-hidden="true">3.2.</strong> Azure</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/index.html"><strong aria-hidden="true">3.2.1.</strong> Core Networking Infrastructure Checklist</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/index.html"><strong aria-hidden="true">3.2.1.1.</strong> Design-and-implement-core-network-infra</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/name-resolution.html"><strong aria-hidden="true">3.2.1.1.1.</strong> Azure DNS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/vnet.html"><strong aria-hidden="true">3.2.1.1.2.</strong> Azure Virtual Network (VNet)</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/nat.html"><strong aria-hidden="true">3.2.1.1.3.</strong> Azure Virtual Network NAT</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/ip-addressing.html"><strong aria-hidden="true">3.2.1.1.4.</strong> IPv4 and IPv6 Addressing</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/subnets.html"><strong aria-hidden="true">3.2.1.1.5.</strong> Subnets</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-core-network-infra/vmss.html"><strong aria-hidden="true">3.2.1.1.6.</strong> Virtual Machine Scale Sets</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-private-access/index.html"><strong aria-hidden="true">3.2.1.2.</strong> Design-and-implement-private-access</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-private-access/service-endpoints.html"><strong aria-hidden="true">3.2.1.2.1.</strong> Azure Service Endpoint</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-private-access/private-link.html"><strong aria-hidden="true">3.2.1.2.2.</strong> Private Link</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/index.html"><strong aria-hidden="true">3.2.1.3.</strong> Design-and-implement-routing</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/application-gateway.html"><strong aria-hidden="true">3.2.1.3.1.</strong> Application Gateway</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/availability-sets.html"><strong aria-hidden="true">3.2.1.3.2.</strong> Azure Availability Sets</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/front-door.html"><strong aria-hidden="true">3.2.1.3.3.</strong> Azure Front Door</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/load-balancer.html"><strong aria-hidden="true">3.2.1.3.4.</strong> Azure Load Balancer</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/routing.html"><strong aria-hidden="true">3.2.1.3.5.</strong> Azure Virtual Network Routing</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-and-implement-routing/traffic-manager.html"><strong aria-hidden="true">3.2.1.3.6.</strong> Traffic Manager</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-implement-and-manage-hybrid-networking/index.html"><strong aria-hidden="true">3.2.1.4.</strong> Design-implement-and-manage-hybrid-networking</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-implement-and-manage-hybrid-networking/express-route.html"><strong aria-hidden="true">3.2.1.4.1.</strong> Azure Express Route</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-implement-and-manage-hybrid-networking/vwan.html"><strong aria-hidden="true">3.2.1.4.2.</strong> Azure Virtual WAN</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/design-implement-and-manage-hybrid-networking/vpn.html"><strong aria-hidden="true">3.2.1.4.3.</strong> VPN</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/index.html"><strong aria-hidden="true">3.2.1.5.</strong> Secure-and-monitor-networks</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/asg.html"><strong aria-hidden="true">3.2.1.5.1.</strong> Application Security Groups</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/azure-firewall.html"><strong aria-hidden="true">3.2.1.5.2.</strong> Azure Firewall</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/ddos-protection.html"><strong aria-hidden="true">3.2.1.5.3.</strong> DDoS Protection</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/nsg.html"><strong aria-hidden="true">3.2.1.5.4.</strong> Network Security Groups</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/network-watcher.html"><strong aria-hidden="true">3.2.1.5.5.</strong> Network Watcher</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="clouds/azure/az700/secure-and-monitor-networks/waf.html"><strong aria-hidden="true">3.2.1.5.6.</strong> Web Application Firewall</a></span></li></ol></li></ol></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/index.html"><strong aria-hidden="true">4.</strong> Coding</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/assembly/notes.html"><strong aria-hidden="true">4.1.</strong> Assembly</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/c/notes.html"><strong aria-hidden="true">4.2.</strong> C Programming Notes</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/golang/go-projects.html"><strong aria-hidden="true">4.3.</strong> Go-projects</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/paradigms/functional-programming.html"><strong aria-hidden="true">4.4.</strong> Immutability</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/paradigms/imperative-programming.html"><strong aria-hidden="true">4.5.</strong> Imperative-programming</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/c/gcc-compilation-process.html"><strong aria-hidden="true">4.6.</strong> The 4 Steps of Compilation with GCC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="coding/golang/bufio.html"><strong aria-hidden="true">4.7.</strong> the bufio package</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/index.html"><strong aria-hidden="true">5.</strong> Computer Science</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/algorithms.html"><strong aria-hidden="true">5.1.</strong> Algorithms</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/computer_architecture/notes.html"><strong aria-hidden="true">5.2.</strong> Computer Architecture</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/data_structures.html"><strong aria-hidden="true">5.3.</strong> Data Structures</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/euclids_algorithm.html"><strong aria-hidden="true">5.4.</strong> Euclid&#39;s Algorithm</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/fizzbuzz.html"><strong aria-hidden="true">5.5.</strong> fizzbuzz</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/graph-theory.html"><strong aria-hidden="true">5.6.</strong> Graph Theory</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/hashing.html"><strong aria-hidden="true">5.7.</strong> Hashing</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="compsci/string_algorithms.html"><strong aria-hidden="true">5.8.</strong> string algorithms</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="databases/index.html"><strong aria-hidden="true">6.</strong> Databases</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="databases/mssql.html"><strong aria-hidden="true">6.1.</strong> MSSQL</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="databases/mysql.html"><strong aria-hidden="true">6.2.</strong> MySQL</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="databases/oracle.html"><strong aria-hidden="true">6.3.</strong> Oracle</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="devops/index.html"><strong aria-hidden="true">7.</strong> DevOps</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="devops/principles.html"><strong aria-hidden="true">7.1.</strong> DevOps Principles</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/index.html"><strong aria-hidden="true">8.</strong> Electronics</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/555-timer-ic.html"><strong aria-hidden="true">8.1.</strong> 555 Timer IC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/capacitors.html"><strong aria-hidden="true">8.2.</strong> Capacitors</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/digital-logic-gates.html"><strong aria-hidden="true">8.3.</strong> Digital Logic Gates</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/diodes.html"><strong aria-hidden="true">8.4.</strong> Diodes</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/inductors.html"><strong aria-hidden="true">8.5.</strong> Inductors</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/laws.html"><strong aria-hidden="true">8.6.</strong> Laws</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/microcontrollers.html"><strong aria-hidden="true">8.7.</strong> Microcontrollers</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/operational-amplifiers.html"><strong aria-hidden="true">8.8.</strong> Operational Amplifiers</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/resistors.html"><strong aria-hidden="true">8.9.</strong> Resistors</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="electronics/transistors.html"><strong aria-hidden="true">8.10.</strong> Transistors</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fun/index.html"><strong aria-hidden="true">9.</strong> Fun</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fun/modify-machine-code.html"><strong aria-hidden="true">9.1.</strong> Modify Machine Code</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/index.html"><strong aria-hidden="true">10.</strong> InfoSec</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/adds.html"><strong aria-hidden="true">10.1.</strong> Active Directory Domain Services</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/attacking-cred-mgr.html"><strong aria-hidden="true">10.2.</strong> attacking-cred-mgr</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/attacking-dns.html"><strong aria-hidden="true">10.3.</strong> attacking-dns</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/attacking-rdp.html"><strong aria-hidden="true">10.4.</strong> attacking-rdp</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/attacking-smb.html"><strong aria-hidden="true">10.5.</strong> attacking-smb</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/attacking-sql-databases.html"><strong aria-hidden="true">10.6.</strong> attacking-sql-databases</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/htb/brute-forcing.html"><strong aria-hidden="true">10.7.</strong> Brute-Forcing</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/cracking-protected-files.html"><strong aria-hidden="true">10.8.</strong> cracking-protected-files</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/crawling.html"><strong aria-hidden="true">10.9.</strong> crawling</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/vulnerabilities/cve.html"><strong aria-hidden="true">10.10.</strong> CVE</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/vulnerabilities/cvss.html"><strong aria-hidden="true">10.11.</strong> CVSS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/enumeration.html"><strong aria-hidden="true">10.12.</strong> Enumeration</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/htb/footprinting.html"><strong aria-hidden="true">10.13.</strong> footprinting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/laudanum.html"><strong aria-hidden="true">10.14.</strong> Laudanum</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/file-transfers/linux.html"><strong aria-hidden="true">10.15.</strong> Linux File Transfer Methods</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/linux/linux-auth.html"><strong aria-hidden="true">10.16.</strong> linux-auth</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/logon-types.html"><strong aria-hidden="true">10.17.</strong> Logon Types</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/pass-the-certificate.html"><strong aria-hidden="true">10.18.</strong> Pass the Certificate</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/pass-the-hash.html"><strong aria-hidden="true">10.19.</strong> Pass the Hash</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/pass-the-ticket.html"><strong aria-hidden="true">10.20.</strong> Pass the Ticket</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/robots-txt.html"><strong aria-hidden="true">10.21.</strong> robots.txt</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/shell-harnesses.html"><strong aria-hidden="true">10.22.</strong> shell-harnesses</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/shell-payloads.html"><strong aria-hidden="true">10.23.</strong> shell-payloads</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/well-known-uris.html"><strong aria-hidden="true">10.24.</strong> well-known-uris</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/file-transfers/windows.html"><strong aria-hidden="true">10.25.</strong> Windows File Transfer Methods</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/windows/windows-auth.html"><strong aria-hidden="true">10.26.</strong> windows-auth</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/pivoting-tunneling-portforward/index.html"><strong aria-hidden="true">10.27.</strong> Pivoting, Tunneling, and Port Forwarding</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/pivoting-tunneling-portforward/ssh-local-port-forwarding.html"><strong aria-hidden="true">10.27.1.</strong> SSH Local Port Forwarding</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/pivoting-tunneling-portforward/ssh-dynamic-port-forwarding.html"><strong aria-hidden="true">10.27.2.</strong> SSH Dynamic Port Forwarding</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="infosec/pivoting-tunneling-portforward/ssh-remote-port-forwarding.html"><strong aria-hidden="true">10.27.3.</strong> SSH Remote Port Forwarding</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/index.html"><strong aria-hidden="true">11.</strong> Kubernetes</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/cks/index.html"><strong aria-hidden="true">11.1.</strong> CKS</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/cks/notes.html"><strong aria-hidden="true">11.1.1.</strong> Certified Kubernetes Security Specialist (CKS) Notes</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/cks/questions.html"><strong aria-hidden="true">11.1.2.</strong> Kubernetes Security Specialist (CKS) Practice Scenarios</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/kcna/index.html"><strong aria-hidden="true">11.2.</strong> KCNA</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/kcna/notes.html"><strong aria-hidden="true">11.2.1.</strong> Kubernetes Certified Native Associate (KCNA) Notes</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/kcsa/index.html"><strong aria-hidden="true">11.3.</strong> KCSA</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="kubernetes/kcsa/notes.html"><strong aria-hidden="true">11.3.1.</strong> Kubernetes Certified Security Associate (KCSA) Notes</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/index.html"><strong aria-hidden="true">12.</strong> Networking</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/index.html"><strong aria-hidden="true">12.1.</strong> Browser Networking</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter01.html"><strong aria-hidden="true">12.1.1.</strong> Chapter 1</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter02.html"><strong aria-hidden="true">12.1.2.</strong> Chapter 2</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter03.html"><strong aria-hidden="true">12.1.3.</strong> Chapter 3</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter04.html"><strong aria-hidden="true">12.1.4.</strong> Chapter 4</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter09.html"><strong aria-hidden="true">12.1.5.</strong> Chapter09</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter10.html"><strong aria-hidden="true">12.1.6.</strong> Chapter 10</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter11.html"><strong aria-hidden="true">12.1.7.</strong> Chapter 11</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter12.html"><strong aria-hidden="true">12.1.8.</strong> Chapter12</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter13.html"><strong aria-hidden="true">12.1.9.</strong> Chapter 13</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter15.html"><strong aria-hidden="true">12.1.10.</strong> Chapter 15</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter16.html"><strong aria-hidden="true">12.1.11.</strong> Chapter 16</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/browser-networking/chapter17.html"><strong aria-hidden="true">12.1.12.</strong> Chapter 17</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/http/index.html"><strong aria-hidden="true">12.2.</strong> HTTP</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/http/clean_urls.html"><strong aria-hidden="true">12.2.1.</strong> Clean URLs</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/http/persistent_connections.html"><strong aria-hidden="true">12.2.2.</strong> HTTP Persistent Connection</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/http/url-vs-uri-vs-urn.html"><strong aria-hidden="true">12.2.3.</strong> URN</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/load-balancing/index.html"><strong aria-hidden="true">12.3.</strong> Load Balancing</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/load-balancing/load-balancing.html"><strong aria-hidden="true">12.3.1.</strong> load balancing</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/nginx/index.html"><strong aria-hidden="true">12.4.</strong> Nginx</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/nginx/custom-header-response.html"><strong aria-hidden="true">12.4.1.</strong> set header</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/rate-limiting/index.html"><strong aria-hidden="true">12.5.</strong> Rate Limiting Algorithms</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/rate-limiting/fixed-window-counter.html"><strong aria-hidden="true">12.5.1.</strong> Fixed Window Counter Algorithm</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/rate-limiting/leaking-bucket.html"><strong aria-hidden="true">12.5.2.</strong> Leaking Bucket Algorithm</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/rate-limiting/token-bucket.html"><strong aria-hidden="true">12.5.3.</strong> TOKEN BUCKET ALGORITHM</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/index.html"><strong aria-hidden="true">13.</strong> Protocols</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/dns.html"><strong aria-hidden="true">13.1.</strong> DNS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/ftp.html"><strong aria-hidden="true">13.2.</strong> FTP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/icmp.html"><strong aria-hidden="true">13.3.</strong> ICMP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/imap-pop3.html"><strong aria-hidden="true">13.4.</strong> IMAP/POP3</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/ipmi.html"><strong aria-hidden="true">13.5.</strong> IPMI</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/mqtt.html"><strong aria-hidden="true">13.6.</strong> MQTT</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/nfs.html"><strong aria-hidden="true">13.7.</strong> NFS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/ntp.html"><strong aria-hidden="true">13.8.</strong> NTP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/quic.html"><strong aria-hidden="true">13.9.</strong> QUIC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/smb.html"><strong aria-hidden="true">13.10.</strong> SMB</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/smtp.html"><strong aria-hidden="true">13.11.</strong> SMTP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/snmp.html"><strong aria-hidden="true">13.12.</strong> SNMP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/ssh.html"><strong aria-hidden="true">13.13.</strong> SSH</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/tls.html"><strong aria-hidden="true">13.14.</strong> TLS</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/udp.html"><strong aria-hidden="true">13.15.</strong> UDP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="networking/protocols/websockets.html"><strong aria-hidden="true">13.16.</strong> WebSockets</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="redis/index.html"><strong aria-hidden="true">14.</strong> Redis</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="redis/redis.html"><strong aria-hidden="true">14.1.</strong> redis</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/index.html"><strong aria-hidden="true">15.</strong> Systems</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/bash/index.html"><strong aria-hidden="true">15.1.</strong> Bash</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/bash/bash_notes.html"><strong aria-hidden="true">15.1.1.</strong> bash notes</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/bash/keyboard_shortcuts.html"><strong aria-hidden="true">15.1.2.</strong> Moving the cursor:</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/index.html"><strong aria-hidden="true">15.2.</strong> Commands</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/chgrp.html"><strong aria-hidden="true">15.2.1.</strong> chgrp</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/chmod.html"><strong aria-hidden="true">15.2.2.</strong> Chmod</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/chown.html"><strong aria-hidden="true">15.2.3.</strong> chown</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/dd.html"><strong aria-hidden="true">15.2.4.</strong> dd</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/groups.html"><strong aria-hidden="true">15.2.5.</strong> groups</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/ip.html"><strong aria-hidden="true">15.2.6.</strong> ip</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/jobcontrol.html"><strong aria-hidden="true">15.2.7.</strong> Job Control</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/kill.html"><strong aria-hidden="true">15.2.8.</strong> Kill</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/lsscsi.html"><strong aria-hidden="true">15.2.9.</strong> lsscsi</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/passwd.html"><strong aria-hidden="true">15.2.10.</strong> passwd</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/ps.html"><strong aria-hidden="true">15.2.11.</strong> ps</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/commands/umask.html"><strong aria-hidden="true">15.2.12.</strong> umask</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/common_files_dirs.html"><strong aria-hidden="true">15.3.</strong> Common Files and Directories</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/development_tools.html"><strong aria-hidden="true">15.4.</strong> Dev Tools</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/devices.html"><strong aria-hidden="true">15.5.</strong> devices</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/disks.html"><strong aria-hidden="true">15.6.</strong> Disks</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/filesystems.html"><strong aria-hidden="true">15.7.</strong> file systems</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/greybeard-qualification/index.html"><strong aria-hidden="true">15.8.</strong> Greybeard Qualification</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/greybeard-qualification/block_dev_and_file_systems.html"><strong aria-hidden="true">15.8.1.</strong> Block Devices and File Systems</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/greybeard-qualification/process_execution_and_scheduling.html"><strong aria-hidden="true">15.8.2.</strong> Execution and Scheduling of Processes and Threads</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/greybeard-qualification/memory_management.html"><strong aria-hidden="true">15.8.3.</strong> Memory Management</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/greybeard-qualification/process_structure_and_ipc.html"><strong aria-hidden="true">15.8.4.</strong> Process Structure and IPC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/greybeard-qualification/startup_and_init.html"><strong aria-hidden="true">15.8.5.</strong> Startup and Init</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/groups.html"><strong aria-hidden="true">15.9.</strong> Groups</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/links.html"><strong aria-hidden="true">15.10.</strong> Hard and Soft Links</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/hashing.html"><strong aria-hidden="true">15.11.</strong> Hashing</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/interrupts.html"><strong aria-hidden="true">15.12.</strong> Interrupts and Traps</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/kernel.html"><strong aria-hidden="true">15.13.</strong> kernel subsystems</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/key-value-stores.html"><strong aria-hidden="true">15.14.</strong> Key Value Store</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/linux_commands.html"><strong aria-hidden="true">15.15.</strong> commands</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/boot_process.html"><strong aria-hidden="true">15.16.</strong> Linux Kernel Boot Process</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/linux-kernel-development/index.html"><strong aria-hidden="true">15.17.</strong> Linux Kernel Development</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/linux-kernel-development/building-the-linux-kernel.html"><strong aria-hidden="true">15.17.1.</strong> Building the Linux Kernel</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/linux-kernel-development/kernel-modules.html"><strong aria-hidden="true">15.17.2.</strong> Kernel Modules</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/observability-sources.html"><strong aria-hidden="true">15.18.</strong> Linux Observability Sources</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/logging.html"><strong aria-hidden="true">15.19.</strong> Logging</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/lvm.html"><strong aria-hidden="true">15.20.</strong> lvm (logical volume manager)</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/make.html"><strong aria-hidden="true">15.21.</strong> make</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/memory.html"><strong aria-hidden="true">15.22.</strong> memory</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/memory_management.html"><strong aria-hidden="true">15.23.</strong> Memory Management</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/network-manager.html"><strong aria-hidden="true">15.24.</strong> network manager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/networking.html"><strong aria-hidden="true">15.25.</strong> Networking</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/per-process-analysis.html"><strong aria-hidden="true">15.26.</strong> Per-Process Analysis</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/permissions.html"><strong aria-hidden="true">15.27.</strong> Permissions</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/pam.html"><strong aria-hidden="true">15.28.</strong> Pluggable Authentication Modules (PAM)</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/processes.html"><strong aria-hidden="true">15.29.</strong> processes</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/scheduled_tasks.html"><strong aria-hidden="true">15.30.</strong> Scheduled Tasks</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/startup_files.html"><strong aria-hidden="true">15.31.</strong> Bash Startup Files</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/syscall.html"><strong aria-hidden="true">15.32.</strong> System Calls</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/system-wide-analysis.html"><strong aria-hidden="true">15.33.</strong> System Wide Analysis</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/systemd.html"><strong aria-hidden="true">15.34.</strong> Systemd</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/the_first_60_seconds.html"><strong aria-hidden="true">15.35.</strong> The first 60 seconds</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/time.html"><strong aria-hidden="true">15.36.</strong> time</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/troubleshooting.html"><strong aria-hidden="true">15.37.</strong> troubleshooting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/storage.html"><strong aria-hidden="true">15.38.</strong> Troubleshooting Storage</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="systems/users.html"><strong aria-hidden="true">15.39.</strong> Users and User Management</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/index.html"><strong aria-hidden="true">16.</strong> Tools</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/ffuf.html"><strong aria-hidden="true">16.1.</strong> ffuf</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/hashcat.html"><strong aria-hidden="true">16.2.</strong> hashcat</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/hydra.html"><strong aria-hidden="true">16.3.</strong> hydra</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/dnspinger.html"><strong aria-hidden="true">16.4.</strong> instructions for using dnspinger</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/john.html"><strong aria-hidden="true">16.5.</strong> john the ripper</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/lazagne.html"><strong aria-hidden="true">16.6.</strong> lazagne</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/medusa.html"><strong aria-hidden="true">16.7.</strong> medusa</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/metasploit.html"><strong aria-hidden="true">16.8.</strong> metasploit</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/mimikatz.html"><strong aria-hidden="true">16.9.</strong> mimikatz</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/msfvenom.html"><strong aria-hidden="true">16.10.</strong> msfvenom</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/cli-tool-improvements.html"><strong aria-hidden="true">16.11.</strong> Need to add/refine:</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/nmap.html"><strong aria-hidden="true">16.12.</strong> nmap</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/pypykatz.html"><strong aria-hidden="true">16.13.</strong> pypykatz</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/rubeus.html"><strong aria-hidden="true">16.14.</strong> rubeus</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="tools/unshadow.html"><strong aria-hidden="true">16.15.</strong> unshadow</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/index.html"><strong aria-hidden="true">17.</strong> Troubleshooting</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/linux/index.html"><strong aria-hidden="true">17.1.</strong> Linux</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/linux/memory.html"><strong aria-hidden="true">17.1.1.</strong> Troubleshooting Memory</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/performance-mantras.html"><strong aria-hidden="true">17.2.</strong> Performance Mantras</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/RED-method.html"><strong aria-hidden="true">17.3.</strong> RED Method</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/problem-statement.html"><strong aria-hidden="true">17.4.</strong> The Problem Statement</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/troubleshooting_playbook/index.html"><strong aria-hidden="true">17.5.</strong> Troubleshooting Playbook</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/troubleshooting_playbook/kubernetes-general.html"><strong aria-hidden="true">17.5.1.</strong> General troubleshooting/notes</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/troubleshooting_playbook/kubernetes-containerized-app-503s.html"><strong aria-hidden="true">17.5.2.</strong> Troubleshooting 503s for Apps in Kubernetes</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="troubleshooting/USE-method.html"><strong aria-hidden="true">17.6.</strong> USE Method</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="what-happens-when/index.html"><strong aria-hidden="true">18.</strong> What Happens When...</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="what-happens-when/a-cpu-starts.html"><strong aria-hidden="true">18.1.</strong> What happens when a CPU starts?</a></span></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        const sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level >= level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

